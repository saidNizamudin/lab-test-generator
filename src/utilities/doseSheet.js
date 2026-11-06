const COLUMNS = ['code', 'name', 'desc', 'type', 'formula'];

function columnName(label) {
	const key = String(label || '').trim().toLowerCase();
	if (key === 'description') return 'desc';
	return COLUMNS.includes(key) ? key : '';
}

export function sheetEndpoints(sheetUrl) {
	const match = String(sheetUrl || '').trim().match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
	if (!match) return null;
	const id = match[1];
	return {
		editUrl: `https://docs.google.com/spreadsheets/d/${id}/edit`,
		readUrl: `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json`,
	};
}

export async function fetchDoseRows(readUrl) {
	const response = await fetch(readUrl, { cache: 'no-store' });
	if (!response.ok) throw new Error('sheet');
	const text = await response.text();
	const start = text.indexOf('{');
	const end = text.lastIndexOf('}');
	if (start < 0 || end < start) throw new Error('sheet');

	const payload = JSON.parse(text.slice(start, end + 1));
	if (payload.status && payload.status !== 'ok') throw new Error('sheet');

	const table = payload.table;
	let headers = (table?.cols || []).map((col) => columnName(col.label));
	let dataRows = table?.rows || [];
	if (!COLUMNS.every((column) => headers.includes(column))) {
		headers = (dataRows[0]?.c || []).map((cell) => columnName(cell?.v));
		if (!COLUMNS.every((column) => headers.includes(column))) throw new Error('columns');
		dataRows = dataRows.slice(1);
	}

	return dataRows
		.map((row) => {
			const cells = (row.c || []).map((cell) => {
				if (!cell || cell.v == null) return '';
				return String(cell.f ?? cell.v).trim();
			});
			const record = {};
			headers.forEach((header, index) => {
				if (COLUMNS.includes(header)) record[header] = cells[index] || '';
			});
			return record;
		})
		.filter((row) => row.code || row.name || row.formula);
}

export function groupMedicines(rows) {
	const groups = [];
	const index = new Map();

	rows.forEach((row, rowIndex) => {
		const code = (row.code || '').trim();
		const key = code ? code.toLowerCase() : `__row_${rowIndex}`;
		let group = index.get(key);
		if (!group) {
			group = { code, name: '', descParts: [], formulas: [] };
			index.set(key, group);
			groups.push(group);
		}
		if (!group.name && row.name) group.name = row.name.trim();
		const desc = (row.desc || '').trim();
		if (desc && !group.descParts.includes(desc)) group.descParts.push(desc);
		group.formulas.push({
			type: (row.type || '').trim(),
			formula: (row.formula || '').trim(),
		});
	});

	return groups.map((group, index) => ({
		id: group.code ? group.code.toLowerCase() : `row-${index}`,
		code: group.code,
		name: group.name,
		desc: group.descParts.join(' · '),
		formulas: group.formulas,
	}));
}
