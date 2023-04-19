import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Input from './Input';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

function App() {
	const [name, setName] = useState('');
	const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
	const [hemoglobin, setHemoglobin] = useState('');
	const [leukosit, setLeukosit] = useState('');
	const [trombosit, setTrombosit] = useState('');
	const [mvc, setMVC] = useState('');
	const [mch, setMCH] = useState('');
	const [mchc, setMCHC] = useState('');
	const [neutrofit, setNeutrofit] = useState('');
	const [limfosit, setLimfosit] = useState('');
	const [monosit, setMonosit] = useState('');
	const [eosinofil, setEosinofil] = useState('');
	const [basofil, setBasofil] = useState('');
	const [stab, setStab] = useState('');
	const [kalium, setKalium] = useState('');
	const [natrium, setNatrium] = useState('');
	const [klorida, setKlorida] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<form>
					<div className={styles.nameDateInput}>
						<Input
							label="Nama"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<div key="date" className={styles.inputContainer}>
							<label className={styles.label} htmlFor="date">
								<strong>Tanggal</strong>
							</label>
							<input
								type="date"
								name="date"
								onChange={(e) => {
									setDate(e.target.value);
								}}
								value={date}
								className={styles.input}
							/>
						</div>
					</div>
					<div className={styles.hltInput}>
						<Input
							label="Hemoglobin"
							name="hemoglobin"
							value={hemoglobin}
							onChange={(e) => setHemoglobin(e.target.value)}
						/>
						<Input
							label="Leukosit"
							name="leukosit"
							value={leukosit}
							onChange={(e) => setLeukosit(e.target.value)}
						/>
						<Input
							label="Trombosit"
							name="trombosit"
							value={trombosit}
							onChange={(e) => setTrombosit(e.target.value)}
						/>
					</div>
					<div className={styles.mvcInput}>
						<Input label="MVC" name="mvc" value={mvc} onChange={(e) => setMVC(e.target.value)} />
						<Input label="MCH" name="mch" value={mch} onChange={(e) => setMCH(e.target.value)} />
						<Input
							label="MCHC"
							name="mchc"
							value={mchc}
							onChange={(e) => setMCHC(e.target.value)}
						/>
					</div>
					<div className={styles.diftelInput}>
						<Input
							label="Neutrofit"
							name="neutrofit"
							value={neutrofit}
							onChange={(e) => setNeutrofit(e.target.value)}
						/>
						<Input
							label="Limfosit"
							name="limfosit"
							value={limfosit}
							onChange={(e) => setLimfosit(e.target.value)}
						/>
						<Input
							label="Monosit"
							name="monosit"
							value={monosit}
							onChange={(e) => setMonosit(e.target.value)}
						/>
						<Input
							label="Eosinofil"
							name="eosinofil"
							value={eosinofil}
							onChange={(e) => setEosinofil(e.target.value)}
						/>
						<Input
							label="Basofil"
							name="basofil"
							value={basofil}
							onChange={(e) => setBasofil(e.target.value)}
						/>
						<Input
							label="Stab"
							name="stab"
							value={stab}
							onChange={(e) => setStab(e.target.value)}
						/>
					</div>
					<div className={styles.kaliumInput}>
						<Input
							label="Kalium"
							name="kalium"
							value={kalium}
							onChange={(e) => setKalium(e.target.value)}
						/>
						<Input
							label="Natrium"
							name="natrium"
							value={natrium}
							onChange={(e) => setNatrium(e.target.value)}
						/>
						<Input
							label="Klorida"
							name="klorida"
							value={klorida}
							onChange={(e) => setKlorida(e.target.value)}
						/>
					</div>
				</form>
			</div>
			<div className={styles.result}></div>
		</div>
	);
}

export default App;
