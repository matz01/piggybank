export const getSummedData = (data, month, type, sv) => {
	if(!data[type]) return undefined;
	if(month){
		return data[type].reduce(function (acc, obj) {
			return acc + (sv ? (parseInt(obj[`s${month}`]) || 0) : (parseInt(obj[`m${month}`]) || 0));
		}, 0);
	}
	const months = [];
	Array.from(Array(12).keys()).map((item, index) => {
		const monthTotal = data[type].reduce(function (acc, obj) {
			return acc + (sv ? (parseInt(obj[`s${index +1}`]) || 0) : (parseInt(obj[`m${index +1}`]) || 0));
		}, 0);
		months.push(monthTotal)
	})

	return months.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

};

export const getSummedByType = (type) => {
	let total = 0;
	for(let a = 1; a < 12; a++) {
		total += parseInt(type[`m${a}`])
	}
	return total
};


export const fullDataWithTotal = (data, dataArray) => {
	data.map(type => {
		dataArray.push(
			{
				...type,
				total: getSummedByType(type)
			}
		);
	});
};


