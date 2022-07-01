import { getMonth } from './getMonth';

const costMapper = month => tr => {
	return {
		...tr
	};
};

export const budgetAndTransactions = (data) => {
	const { allTransactions, budget } = data;
	const actualMonth = getMonth();

	function getByMonths(budget, transactions, month) {
		if (month >= actualMonth) return { m: parseInt(budget), s: 0 };
		const res = transactions.filter(o => parseInt(o.month) === month)[0] || {total: 0}
		const m = parseInt(res.total);
		return {
			m,
			s: budget - m
		};
	}

	function getById(id) {
		return allTransactions.filter(o => o.id === id) || [];
	}

	return budget.map(tr => {
		const totTransM = getById(tr.id);
		const m5 = getByMonths(tr.m5, totTransM, 5);
		const m6 = getByMonths(tr.m6, totTransM, 6);
		const m7 = getByMonths(tr.m7, totTransM, 7);
		const m8 = getByMonths(tr.m8, totTransM, 8);
		const m9 = getByMonths(tr.m9, totTransM, 9);
		const m10 = getByMonths(tr.m10, totTransM, 10);
		const m11 = getByMonths(tr.m11, totTransM, 11);
		const m12 = getByMonths(tr.m12, totTransM, 12);

		return {
			...tr,
			m1: tr.m1,
			m2: tr.m2,
			m3: tr.m3,
			m4: tr.m4,
			m5: m5.m,
			m6: m6.m,
			m7: m7.m,
			m8: m8.m,
			m9: m9.m,
			m10: m10.m,
			m11: m11.m,
			m12: m12.m,
			s1: 0,
			s2: 0,
			s3: 0,
			s4: 0,
			s5: m5.s,
			s6: m6.s,
			s7: m7.s,
			s8: m8.s,
			s9: m9.s,
			s10: m10.s,
			s11: m11.s,
			s12: m12.s,
		};
	});

};

export const mappedCosts = (data, month) => {
	const { fixed_costs, income } = data;
	const fixed = fixed_costs.map(costMapper(month));
	const inc = income.map(costMapper(month));

	return { fixed, inc };
};
