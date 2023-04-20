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
import { faCopy, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HeartSwitch } from '@anatoliygatt/heart-switch';
import Select from 'react-select';

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
		igm: '',
		igg: '',
		hcv: '',
		hbsag: '',
		btotal: '',
		bdirekt: '',
		bindirekt: '',
		sgot: '',
		sgpt: '',
		albumin: '',
		gds: '',
		ur: '',
		cr: '',
		isUseAntiDengue: false,
		isUseHCV: false,
		isUseHBSAG: false,
		isUseBil: false,
		isUseSGOTSGPT: false,
		isUseAlbumin: false,
		isUseGDS: false,
		isUseUrCr: false,
	});

	const [finalResult, setFinalResult] = useState('');

	const plusMinusOptions = [
		{ value: '-', label: '-' },
		{ value: '+', label: '+' },
	];
	const reaktidNonReaktifOptions = [
		{ value: 'Non Reaktif', label: 'Non Reaktif' },
		{ value: 'Reaktif', label: 'Reaktif' },
	];

	const dispatch = useDispatch();
	const data = useSelector((state) => state.lab);

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<form>
					<div className={styles.formGroup}>
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
					</div>
					<div className={styles.formGroup}>
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
					</div>
					<div className={styles.formGroup}>
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
					</div>
					<div className={styles.formGroup}>
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
					</div>
					<div className={styles.formGroup}>
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
					</div>
					<div className={styles.formGroup}>
						<span className={dataForm.isUseAntiDengue ? styles.title : styles.notUsedTitle}>
							Anti Dengue igM/igG
							<HeartSwitch
								size="md"
								checked={dataForm.isUseAntiDengue}
								onChange={(e) => {
									setDataForm({ ...dataForm, isUseAntiDengue: e.target.checked });
								}}
							/>
						</span>
						<div className={styles.antiDengueInput}>
							<Select
								className={styles.select}
								options={plusMinusOptions}
								placeholder={dataForm.igm ? dataForm.igm : 'igM'}
								onChange={(selectedOption) => {
									setDataForm({
										...dataForm,
										igm: selectedOption ? selectedOption.value : '',
									});
								}}
								value={dataForm.igm}
							/>
							<Select
								className={styles.select}
								options={plusMinusOptions}
								placeholder={dataForm.igg ? dataForm.igg : 'igG'}
								onChange={(selectedOption) => {
									setDataForm({
										...dataForm,
										igg: selectedOption ? selectedOption.value : '',
									});
								}}
								value={dataForm.igg}
							/>
						</div>
					</div>
					<div className={styles.formGroup}>
						<span className={dataForm.isUseHCV ? styles.title : styles.notUsedTitle}>
							Anti HCV
							<HeartSwitch
								size="md"
								checked={dataForm.isUseHCV}
								onChange={(e) => {
									setDataForm({ ...dataForm, isUseHCV: e.target.checked });
								}}
							/>
						</span>
						<div className={styles.antiHCVInput}>
							<Select
								className={styles.select}
								options={plusMinusOptions}
								placeholder={dataForm.hcv ? dataForm.hcv : 'HCV'}
								onChange={(selectedOption) => {
									setDataForm({
										...dataForm,
										hcv: selectedOption ? selectedOption.value : '',
									});
								}}
								value={dataForm.hcv}
							/>
						</div>
					</div>
					<div className={styles.formGroup}>
						<span className={dataForm.isUseHBSAG ? styles.title : styles.notUsedTitle}>
							HBsAg
							<HeartSwitch
								size="md"
								checked={dataForm.isUseHBSAG}
								onChange={(e) => {
									setDataForm({ ...dataForm, isUseHBSAG: e.target.checked });
								}}
							/>
						</span>
						<div className={styles.bhsagInput}>
							<Select
								className={styles.select}
								options={reaktidNonReaktifOptions}
								placeholder={dataForm.hbsag ? dataForm.hbsag : 'HBsAg'}
								onChange={(selectedOption) => {
									setDataForm({
										...dataForm,
										hbsag: selectedOption ? selectedOption.value : '',
									});
								}}
								value={dataForm.hbsag}
							/>
						</div>
					</div>
					<div className={styles.formGroup}>
						<span className={dataForm.isUseBil ? styles.title : styles.notUsedTitle}>
							Bil T/D/I
							<HeartSwitch
								size="md"
								checked={dataForm.isUseBil}
								onChange={(e) => {
									setDataForm({ ...dataForm, isUseBil: e.target.checked });
								}}
							/>
						</span>
						<div className={styles.bilInput}>
							<Input
								label="Total"
								name="btotal"
								value={dataForm.btotal}
								onChange={(e) => setDataForm({ ...dataForm, btotal: e.target.value })}
							/>
							<Input
								label="Direkt"
								name="bdirekt"
								value={dataForm.bdirekt}
								onChange={(e) => setDataForm({ ...dataForm, bdirekt: e.target.value })}
							/>
							<Input
								label="Indirekt"
								name="bindirekt"
								value={dataForm.bindirekt}
								onChange={(e) => setDataForm({ ...dataForm, bindirekt: e.target.value })}
							/>
						</div>
					</div>
					<div className={styles.formGroup}>
						<span className={dataForm.isUseSGOTSGPT ? styles.title : styles.notUsedTitle}>
							SGOT/SGPT
							<HeartSwitch
								size="md"
								checked={dataForm.isUseSGOTSGPT}
								onChange={(e) => {
									setDataForm({ ...dataForm, isUseSGOTSGPT: e.target.checked });
								}}
							/>
						</span>
						<div className={styles.sgotInput}>
							<Input
								label="SGOT"
								name="sgot"
								value={dataForm.sgot}
								onChange={(e) => setDataForm({ ...dataForm, sgot: e.target.value })}
							/>
							<Input
								label="SGPT"
								name="sgpt"
								value={dataForm.sgpt}
								onChange={(e) => setDataForm({ ...dataForm, sgpt: e.target.value })}
							/>
						</div>
					</div>
					<div className={styles.formGroup}>
						<span className={dataForm.isUseAlbumin ? styles.title : styles.notUsedTitle}>
							Albumin
							<HeartSwitch
								size="md"
								checked={dataForm.isUseAlbumin}
								onChange={(e) => {
									setDataForm({ ...dataForm, isUseAlbumin: e.target.checked });
								}}
							/>
						</span>
						<div className={styles.albuminInput}>
							<Input
								label="Albumin"
								name="albumin"
								value={dataForm.albumin}
								onChange={(e) => setDataForm({ ...dataForm, albumin: e.target.value })}
							/>
						</div>
					</div>
					<div className={styles.formGroup}>
						<span className={dataForm.isUseGDS ? styles.title : styles.notUsedTitle}>
							GDS
							<HeartSwitch
								size="md"
								checked={dataForm.isUseGDS}
								onChange={(e) => {
									setDataForm({ ...dataForm, isUseGDS: e.target.checked });
								}}
							/>
						</span>
						<div className={styles.gdsInput}>
							<Input
								label="GDS"
								name="gds"
								value={dataForm.gds}
								onChange={(e) => setDataForm({ ...dataForm, gds: e.target.value })}
							/>
						</div>
					</div>
					<div className={styles.formGroup}>
						<span className={dataForm.isUseUrCr ? styles.title : styles.notUsedTitle}>
							Ur/Cr
							<HeartSwitch
								size="md"
								checked={dataForm.isUseUrCr}
								onChange={(e) => {
									setDataForm({ ...dataForm, isUseUrCr: e.target.checked });
								}}
							/>
						</span>
						<div className={styles.urCrInput}>
							<Input
								label="Ur"
								name="ur"
								value={dataForm.ur}
								onChange={(e) => setDataForm({ ...dataForm, ur: e.target.value })}
							/>
							<Input
								label="Cr"
								name="cr"
								value={dataForm.cryarn}
								onChange={(e) => setDataForm({ ...dataForm, cryarn: e.target.value })}
							/>
						</div>
					</div>
				</form>
				<div className={styles.finalResultContainer}>
					<div className={styles.finalTitleSection}>
						<span className={styles.titleFinal}>Hasil Akhir</span>
						<div className={styles.copyAll}>
							<button
								className={styles.buttonCopyAll}
								onClick={() => {
									const result = data.value
										.map((item) => {
											return displayData(item);
										})
										.join('\n');
									navigator.clipboard
										.writeText(result)
										.then(() => {
											toast.success(`Semuanya berhasil di-copy :))`, {
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
								Copy Semua
							</button>
						</div>
					</div>
					<div className={styles.finalResult}>
						{data.value.map((item, index) => {
							return (
								<>
									{displayHTMLData(item)}
									{index + 1 != data.value.length && <br></br>}
								</>
							);
						})}
					</div>
				</div>
			</div>
			<div className={styles.result}>
				<div className={styles.resultContainer}>
					<div className={styles.buttonSection}>
						<button
							className={styles.button}
							onClick={() => {
								setDataForm(DEFAULT_LEB_TEST_DATA);
								dispatch(addTest(dataForm));
							}}
						>
							<FontAwesomeIcon icon={faPlusCircle} className={styles.icon} />
							Tambah
						</button>
						<button
							className={styles.buttonHapus}
							onClick={() => {
								setDataForm(DEFAULT_LEB_TEST_DATA);
							}}
						>
							<FontAwesomeIcon icon={faTrash} className={styles.icon} />
							Hapus Semua
						</button>
						<button
							className={styles.buttonCopy}
							onClick={() => {
								const result = displayData(dataForm);
								navigator.clipboard
									.writeText(result)
									.then(() => {
										toast.success(`Lab ${dataForm.name} berhasil di-copy :))`, {
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
				<div className={styles.copyright}>
					<span>&copy; All rights reserved | Designed with love by DungDung</span>
				</div>
			</div>

			<ToastContainer />
		</div>
	);
}

export default App;
