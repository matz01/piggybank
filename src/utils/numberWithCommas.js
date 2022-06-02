export function numberWithCommas(x) {
	if(x === undefined) return null
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
