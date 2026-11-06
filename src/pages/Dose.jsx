import { useCallback, useEffect, useMemo, useState } from 'react';
import { calculateFormula, FORMULA_TYPE_LABELS, parseWeight } from '../utilities/doseFormula';
import { fetchDoseRows, groupMedicines, sheetEndpoints } from '../utilities/doseSheet';
import styles from './Dose.module.css';

const ERRORS = {
	missing: 'Daftar obat belum siap. kelola spreadsheet ini untuk menghubungkannya.',
	bad_url: 'Daftar obat tidak bisa dibuka.',
	columns: 'Daftar obat belum lengkap, jadi dosis belum bisa dihitung.',
	sheet: 'Daftar obat gagal dimuat. Coba lagi sebentar.',
};

export default function Dose() {
	const sheet = useMemo(() => {
		const raw = String(import.meta.env.VITE_DOSE_SHEET_URL || '').trim();
		return { raw, endpoints: sheetEndpoints(raw) };
	}, []);
	const [medicines, setMedicines] = useState([]);
	const [status, setStatus] = useState(() => (sheet.raw && sheet.endpoints ? 'loading' : 'error'));
	const [error, setError] = useState(() => {
		if (!sheet.raw) return 'missing';
		if (!sheet.endpoints) return 'bad_url';
		return '';
	});
	const [query, setQuery] = useState('');
	const [weight, setWeight] = useState('');

	const load = useCallback(async () => {
		if (!sheet.raw) {
			setStatus('error');
			setError('missing');
			return;
		}
		if (!sheet.endpoints) {
			setStatus('error');
			setError('bad_url');
			return;
		}
		setStatus('loading');
		try {
			const rows = await fetchDoseRows(sheet.endpoints.readUrl);
			setMedicines(groupMedicines(rows));
			setStatus('ready');
		} catch (err) {
			setMedicines([]);
			setStatus('error');
			setError(err.message === 'columns' ? 'missing' : 'sheet');
		}
	}, [sheet]);

	useEffect(() => {
		load();
	}, [load]);

	const weightKg = parseWeight(weight);
	const needle = query.trim().toLowerCase();
	const visible = medicines.filter((medicine) => {
		if (!needle) return true;
		return `${medicine.code} ${medicine.name} ${medicine.desc}`.toLowerCase().includes(needle);
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.intro}>
					<p className={styles.kicker}>Dosis</p>
					<h1 className={styles.title}>Hitung dari berat badan</h1>
					<p className={styles.lede}>
						Cari obatnya, isi berat badan sekali, dan dosisnya langsung muncul.
					</p>
				</div>
				<div className={styles.actions}>
					{sheet.endpoints && (
						<a
							className={styles.primary}
							href={sheet.endpoints.editUrl}
							target="_blank"
							rel="noreferrer">
							Ubah daftar obat
						</a>
					)}
					<button className={styles.ghost} type="button" onClick={load} disabled={status === 'loading'}>
						Perbarui
					</button>
				</div>
			</div>

			{status === 'loading' && (
				<div className={styles.panel} role="status">
					<div className={styles.state}>
						<div className={styles.spinner} aria-hidden="true" />
						<p>Menyiapkan daftar obat…</p>
					</div>
				</div>
			)}

			{status === 'error' && (
				<div className={styles.panel} role="alert">
					<div className={styles.state}>
						<p>{ERRORS[error] || ERRORS.sheet}</p>
					</div>
				</div>
			)}

			{status === 'ready' && (
				<>
					<div className={styles.toolbar}>
						<label className={styles.field}>
							<span>Cari obat</span>
							<input
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Nama atau kode obat"
							/>
						</label>
						<label className={styles.field}>
							<span>Berat badan (kg)</span>
							<input
								inputMode="decimal"
								value={weight}
								onChange={(event) => setWeight(event.target.value)}
								placeholder="mis. 12,5"
							/>
						</label>
					</div>

					{medicines.length === 0 && (
						<div className={styles.panel}>
							<div className={styles.state}>
								<p>Belum ada obat di daftar.</p>
							</div>
						</div>
					)}

					{medicines.length > 0 && visible.length === 0 && (
						<div className={styles.panel}>
							<div className={styles.state}>
								<p>Tidak ada obat dengan kata itu.</p>
							</div>
						</div>
					)}

					{visible.map((medicine) => (
						<article key={medicine.id} className={styles.card}>
							<div className={styles.medHead}>
								{medicine.code && <span className={styles.code}>{medicine.code}</span>}
								<div>
									<h2 className={styles.name}>{medicine.name || medicine.code}</h2>
									{medicine.desc && <p className={styles.desc}>{medicine.desc}</p>}
								</div>
							</div>
							<ul className={styles.formulas}>
								{medicine.formulas.map((formula, index) => {
									const result = calculateFormula(formula.type, formula.formula, weightKg);
									const typeLabel =
										FORMULA_TYPE_LABELS[formula.type.toLowerCase()] || 'jenis belum dikenali';
									return (
										<li key={`${formula.type}-${formula.formula}-${index}`} className={styles.formulaRow}>
											<div className={styles.formulaMeta}>
												<span className={styles.type}>{typeLabel}</span>
												<span className={styles.formula}>{formula.formula || '—'}</span>
											</div>
											<strong className={doseClass(result.status)}>{doseText(result)}</strong>
										</li>
									);
								})}
							</ul>
						</article>
					))}
				</>
			)}
		</div>
	);
}

function doseText(result) {
	if (result.status === 'ok') return result.dose;
	if (result.status === 'need_weight') return '—';
	if (result.status === 'unknown_type') return 'Jenis dosis belum dikenali';
	return 'Dosis ini belum bisa dihitung';
}

function doseClass(status) {
	if (status === 'ok') return styles.dose;
	if (status === 'need_weight') return `${styles.dose} ${styles.muted}`;
	return `${styles.dose} ${styles.warn}`;
}
