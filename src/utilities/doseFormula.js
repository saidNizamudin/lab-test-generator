const NUM = String.raw`\d+(?:[.,]\d+)?`;
const UNIT = String.raw`mg|mcg|g`;
const AMOUNT = String.raw`${NUM}(?:\s*-\s*${NUM})?\s*(?:${UNIT})(?:\/(?:kgbb|kbgg|kg))?`;
const AMOUNT_PATTERN = new RegExp(`^(${NUM})(?:\\s*-\\s*(${NUM}))?\\s*(${UNIT})(?:\\/(?:kgbb|kbgg|kg))?$`, 'i');

const numberFormat = new Intl.NumberFormat('id-ID', {
	maximumFractionDigits: 4,
});

export const FORMULA_TYPE_LABELS = {
	per_kg: 'sesuai berat',
	per_kg_max: 'sesuai berat, ada batas',
	fixed: 'dosis tetap',
	divided: 'dibagi beberapa kali',
	route: 'cara pemberian',
};

export function parseWeight(raw) {
	if (raw == null) return null;
	const text = String(raw).trim().replace(',', '.');
	if (!text) return null;
	const value = Number(text);
	if (!Number.isFinite(value) || value <= 0) return null;
	return value;
}

export function calculateFormula(type, formula, weightKg) {
	const kind = String(type || '').trim().toLowerCase();
	if (!FORMULA_TYPE_LABELS[kind]) {
		return { status: 'unknown_type', dose: '' };
	}

	const parsed = parseByType(kind, formula);
	if (!parsed) return { status: 'bad_formula', dose: '' };
	if (parsed.needsWeight && !isWeight(weightKg)) return { status: 'need_weight', dose: '' };

	if (kind === 'fixed') {
		return { status: 'ok', dose: formatRange(parsed.amount) };
	}

	const scaled = scale(parsed.amount, weightKg);
	if (kind === 'per_kg' || kind === 'route') {
		const dose = formatRange(scaled);
		return { status: 'ok', dose: parsed.label ? `${parsed.label} ${dose}` : dose };
	}

	if (kind === 'per_kg_max') {
		return { status: 'ok', dose: formatRange(cap(scaled, parsed.cap)) };
	}

	const total = scaled;
	const each = {
		min: total.min / parsed.count,
		max: total.max == null ? null : total.max / parsed.count,
		unit: total.unit,
	};
	return {
		status: 'ok',
		dose: `${formatRange(total)} / hari · ${formatRange(each)} tiap kali`,
	};
}

function parseByType(kind, formula) {
	const text = String(formula || '').trim();
	if (!text) return null;

	if (kind === 'per_kg' || kind === 'fixed') {
		const amount = parseAmount(text);
		if (!amount) return null;
		return { amount, needsWeight: kind === 'per_kg' };
	}

	if (kind === 'per_kg_max') {
		const match = text.match(new RegExp(`^(${AMOUNT})\\s+max\\.?\\s+(${AMOUNT})$`, 'i'));
		if (!match) return null;
		const amount = parseAmount(match[1]);
		const capAmount = parseAmount(match[2]);
		if (!amount || !capAmount || capAmount.max != null || amount.unit !== capAmount.unit) return null;
		return { amount, cap: capAmount.min, needsWeight: true };
	}

	if (kind === 'divided') {
		const match = text.match(new RegExp(`^(${AMOUNT})\\s*/\\s*(${NUM})$`, 'i'));
		if (!match) return null;
		const amount = parseAmount(match[1]);
		const count = parseNum(match[2]);
		if (!amount || count == null || count <= 0) return null;
		return { amount, count, needsWeight: true };
	}

	const match = text.match(new RegExp(`^(.+?)\\s+(${AMOUNT})$`, 'i'));
	if (!match) return null;
	const label = match[1].trim();
	const amount = parseAmount(match[2]);
	if (!label || !amount) return null;
	return { label, amount, needsWeight: true };
}

function parseAmount(raw) {
	const match = String(raw).trim().match(AMOUNT_PATTERN);
	if (!match) return null;
	const min = parseNum(match[1]);
	const max = match[2] ? parseNum(match[2]) : null;
	if (min == null || (match[2] && max == null) || (max != null && max < min)) return null;
	return { min, max, unit: match[3].toLowerCase() };
}

function parseNum(raw) {
	const value = Number(String(raw).replace(',', '.'));
	if (!Number.isFinite(value) || value < 0) return null;
	return value;
}

function isWeight(weightKg) {
	return typeof weightKg === 'number' && Number.isFinite(weightKg) && weightKg > 0;
}

function scale(amount, weightKg) {
	return {
		min: amount.min * weightKg,
		max: amount.max == null ? null : amount.max * weightKg,
		unit: amount.unit,
	};
}

function cap(amount, capValue) {
	return {
		min: Math.min(amount.min, capValue),
		max: amount.max == null ? null : Math.min(amount.max, capValue),
		unit: amount.unit,
	};
}

function formatRange(amount) {
	const min = roundDose(amount.min);
	const max = amount.max == null ? null : roundDose(amount.max);
	if (max == null || max === min) return `${numberFormat.format(min)} ${amount.unit}`;
	return `${numberFormat.format(min)}–${numberFormat.format(max)} ${amount.unit}`;
}

function roundDose(value) {
	return Number(value.toFixed(4));
}
