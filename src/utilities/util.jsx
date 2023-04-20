export function displayData(data) {
	return `Lab ${data.name}\n${data.date}\nH/L/T: ${data.hemoglobin}/${data.leukosit}/${
		data.trombosit
	}\nMcv/mch/mchc: ${data.mvc}/${data.mch}/${data.mchc}\nDiftel: ${data.eosinofil}/${
		data.basofil
	}/${data.nbatang}/${data.nsegmen}/${data.limfosit}/${data.monosit}\n${
		data.isUseAntiDengue ? `Anti Dengue igM/igG: ${data.igm}/${data.igg}\n` : ''
	}${data.isUseHCV ? `Anti HCV: ${data.hcv}\n` : ''}${
		data.isUseHBSAG ? `HBsAg: ${data.hbsag}\n` : ''
	}${data.isUseBil ? `Bil T/D/I: ${data.btotal}/${data.bdirekt}/${data.bindirekt}\n` : ''}${
		data.isUseSGOTSGPT ? `SGOT/SGPT: ${data.sgot}/${data.sgpt}\n` : ''
	}${data.isUseAlbumin ? `Albumin: ${data.albumin}\n` : ''}${
		data.isUseGDS ? `GDS: ${data.gds}\n` : ''
	}${data.isUseUrCr ? `Ur/Cr: ${data.ur}/${data.cr}\n` : ''}K/Na/Cl: ${data.kalium}/${
		data.natrium
	}/${data.klorida}\n`;
}

export function displayHTMLData(data) {
	return (
		<span>
			Lab {data.name} <br></br>
			{data.date}
			<br></br>
			H/L/T: {data.hemoglobin}/{data.leukosit}/{data.trombosit}
			<br></br>
			Mcv/mch/mchc: {data.mvc}/{data.mch}/{data.mchc}
			<br></br>
			Diftel: {data.eosinofil}/{data.basofil}/{data.nbatang}/{data.nsegmen}/{data.limfosit}/
			{data.monosit}
			<br></br>
			{data.isUseAntiDengue && (
				<>
					Anti Dengue igM/igG: {data.igm}/{data.igg}
					<br></br>
				</>
			)}
			{data.isUseHCV && (
				<>
					Anti HCV: {data.hcv}
					<br></br>
				</>
			)}
			{data.isUseHBSAG && (
				<>
					HBsAg: {data.hbsag}
					<br></br>
				</>
			)}
			{data.isUseBil && (
				<>
					Bil T/D/I: {data.btotal}/{data.bdirekt}/{data.bindirekt}
					<br></br>
				</>
			)}
			{data.isUseSGOTSGPT && (
				<>
					SGOT/SGPT: {data.sgot}/{data.sgpt}
					<br></br>
				</>
			)}
			{data.isUseAlbumin && (
				<>
					Albumin: {data.albumin}
					<br></br>
				</>
			)}
			{data.isUseGDS && (
				<>
					GDS: {data.gds}
					<br></br>
				</>
			)}
			{data.isUseUrCr && (
				<>
					Ur/Cr: {data.ur}/{data.cr}
					<br></br>
				</>
			)}
			K/Na/Cl: {data.kalium}/{data.natrium}/{data.klorida}
			<br></br>
		</span>
	);
}
