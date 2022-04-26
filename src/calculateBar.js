export function calculateBar(_max, _amount) {
	const amount = parseInt(_amount);
	const max = parseInt(_max);
	if(amount=== 0 && max === 0) return {widthAmount: 0, widthMax: 0}
	const widthAmount = max > amount ? amount / max * 100 : 100;
	const widthMax = max > amount ? 100 : max / amount * 100;
	return { widthAmount, widthMax };
}
