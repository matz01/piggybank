export const getSummedData = (data, month, type) => {
	if(!data[type]) return undefined;
	if(month){
		return data[type].reduce(function (acc, obj) {
			return acc + parseInt(obj[`m${month}`]) || 0;
		}, 0);
	}
	const months = [];
	Array.from(Array(12).keys()).map((item, index) => {
		const monthTotal = data[type].reduce(function (acc, obj) {
			return acc + parseInt(obj[`m${index +1}`]) || 0;
		}, 0);
		months.push(monthTotal)
	})

	return months.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

};
