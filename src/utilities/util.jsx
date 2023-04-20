export function displayData(data) {
	return `Lab ${data.name}\n${data.date}\nH/L/T: ${data.hemoglobin}/${data.leukosit}/${data.trombosit}\nMcv/mch/mchc: ${data.mvc}/${data.mch}/${data.mchc}\nDiftel: ${data.eosinofil}/${data.basofil}/${data.nbatang}/${data.nsegmen}/${data.limfosit}/${data.monosit}\nK/Na/Cl: ${data.kalium}/${data.natrium}/${data.klorida}`;
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
			K/Na/Cl: {data.kalium}/{data.natrium}/{data.klorida}
		</span>
	);
}
