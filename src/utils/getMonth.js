export function getMonth() {
	const d = new Date();
	const month = d.getMonth() + 1;
	return month;
}

export function getMonthName() {
	const d = new Date();
	const monthName = d.toLocaleString('default', { month: 'long' });
	return monthName;
}
