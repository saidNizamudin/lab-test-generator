import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Input from './Input';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addTest } from '../redux/actions/labActions';
import { displayData, displayHTMLData } from '../utilities/util';
import { DEFAULT_LEB_TEST_DATA } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import 'react-datetime/css/react-datetime.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const [dataForm, setDataForm] = useState({
		name: '',
		date: moment().format('YYYY-MM-DD'),
		hemoglobin: '',
		leukosit: '',
		trombosit: '',
		mvc: '',
		mch: '',
		mchc: '',
		eosinofil: '',
		basofil: '',
		nbatang: '',
		nsegmen: '',
		limfosit: '',
		monosit: '',
		kalium: '',
		natrium: '',
		klorida: '',
	});

	const dispatch = useDispatch();
	const data = useSelector((state) => state.lab);
	console.log(data);

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<form>
					<span className={styles.title}>Nama dan Tanggal</span>
					<div className={styles.nameDateInput}>
						<Input
							label="Nama"
							isText
							name="name"
							value={dataForm.name}
							onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
						/>
						<div key="date" className={styles.inputContainer}>
							<input
								type="date"
								name="date"
								onChange={(e) => setDataForm({ ...dataForm, date: e.target.value })}
								value={dataForm.date}
								className={styles.input}
							/>
						</div>
					</div>
					<span className={styles.title}>H/L/T</span>
					<div className={styles.hltInput}>
						<Input
							label="Hemoglobin"
							name="hemoglobin"
							value={dataForm.hemoglobin}
							onChange={(e) => setDataForm({ ...dataForm, hemoglobin: e.target.value })}
						/>
						<Input
							label="Leukosit"
							name="leukosit"
							value={dataForm.leukosit}
							onChange={(e) => setDataForm({ ...dataForm, leukosit: e.target.value })}
						/>
						<Input
							label="Trombosit"
							name="trombosit"
							value={dataForm.trombosit}
							onChange={(e) => setDataForm({ ...dataForm, trombosit: e.target.value })}
						/>
					</div>
					<span className={styles.title}>Mcv/Mch/Mchc</span>
					<div className={styles.mvcInput}>
						<Input
							label="MVC"
							name="mvc"
							value={dataForm.mvc}
							onChange={(e) => setDataForm({ ...dataForm, mvc: e.target.value })}
						/>
						<Input
							label="MCH"
							name="mch"
							value={dataForm.mch}
							onChange={(e) => setDataForm({ ...dataForm, mch: e.target.value })}
						/>
						<Input
							label="MCHC"
							name="mchc"
							value={dataForm.mchc}
							onChange={(e) => setDataForm({ ...dataForm, mchc: e.target.value })}
						/>
					</div>
					<span className={styles.title}>Diftel</span>
					<div className={styles.diftelInput1}>
						<Input
							label="Eosinofil"
							name="eosinofil"
							value={dataForm.eosinofil}
							onChange={(e) => setDataForm({ ...dataForm, eosinofil: e.target.value })}
						/>
						<Input
							label="Basofil"
							name="basofil"
							value={dataForm.basofil}
							onChange={(e) => setDataForm({ ...dataForm, basofil: e.target.value })}
						/>
						<Input
							label="Netrofil Batang"
							name="nbatang"
							value={dataForm.nbatang}
							onChange={(e) => setDataForm({ ...dataForm, nbatang: e.target.value })}
						/>
					</div>
					<div className={styles.diftelInput2}>
						<Input
							label="Netrofil Segmen"
							name="nsegmen"
							value={dataForm.nsegmen}
							onChange={(e) => setDataForm({ ...dataForm, nsegmen: e.target.value })}
						/>
						<Input
							label="Limfosit"
							name="limfosit"
							value={dataForm.limfosit}
							onChange={(e) => setDataForm({ ...dataForm, limfosit: e.target.value })}
						/>
						<Input
							label="Monosit"
							name="monosit"
							value={dataForm.monosit}
							onChange={(e) => setDataForm({ ...dataForm, monosit: e.target.value })}
						/>
					</div>
					<span className={styles.title}>K/Na/Cl</span>
					<div className={styles.kaliumInput}>
						<Input
							label="Kalium"
							name="kalium"
							value={dataForm.kalium}
							onChange={(e) => setDataForm({ ...dataForm, kalium: e.target.value })}
						/>
						<Input
							label="Natrium"
							name="natrium"
							value={dataForm.natrium}
							onChange={(e) => setDataForm({ ...dataForm, natrium: e.target.value })}
						/>
						<Input
							label="Klorida"
							name="klorida"
							value={dataForm.klorida}
							onChange={(e) => setDataForm({ ...dataForm, klorida: e.target.value })}
						/>
					</div>
				</form>
				<div className={styles.controller}>
					{data.value.map((data) => {
						return (
							<div className={styles.dataContainer} key={data.id}>
								<div className={styles.cardData}>
									<span className={styles.cardDataName}>{data.name}</span>
									<span className={styles.cardDataDate}>{data.date}</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles.result}>
				<div className={styles.resultContainer}>
					<div className={styles.buttonSection}>
						<button
							className={styles.button}
							onClick={() => {
								dispatch(addTest(dataForm));
							}}
						>
							+ Tambah
						</button>
						<button
							className={styles.buttonHapus}
							onClick={() => {
								setDataForm(DEFAULT_LEB_TEST_DATA);
							}}
						>
							- Hapus Semua
						</button>
						<button
							className={styles.buttonCopy}
							onClick={() => {
								const result = displayData(dataForm);
								navigator.clipboard
									.writeText(result)
									.then(() => {
										toast.success(`Copied :))`, {
											position: toast.POSITION.TOP_CENTER,
										});
									})
									.catch(() => {
										toast.error(`Belum terkopi :((`, {
											position: toast.POSITION.TOP_CENTER,
										});
									});
							}}
						>
							<FontAwesomeIcon icon={faCopy} className={styles.icon} />
							Copy
						</button>
					</div>
					{displayHTMLData(dataForm)}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default App;
