import axios from 'axios';
import { dbPath } from '../constants';


export const getRecap = async (callback) => {

	const config = {
		method: 'GET',
		mode: 'no-cors',
		redirect: 'follow',
	}

	let FIXED_URL = `${dbPath}/outgoings?variable=false`
	let INCOME_URL = `${dbPath}/income`
	let MONTHLY_BUDGET_URL = `${dbPath}/outgoings?variable=true`

	const promise1 = axios.get(FIXED_URL, config);
	const promise2 = axios.get(INCOME_URL, config);
	const promise3 = axios.get(MONTHLY_BUDGET_URL, config);

	Promise.all([promise1, promise2, promise3])
		.then(function(values) {
			const fixed_costs = values?.[0]?.data;
			const income = values?.[1]?.data;
			const budget = values?.[2]?.data;

			callback({fixed_costs, income, budget})

		})
		.catch(function (error) {
			console.log(error);
			callback(undefined)
		})

};

export const getTagRecap = async (callback) => {

	const config = {
		method: 'GET',
		mode: 'no-cors',
		redirect: 'follow',
	}

	let FIXED_URL = `${dbPath}/groupByTag`

	const promise1 = axios.get(FIXED_URL, config);

	Promise.all([promise1])
		.then(function(values) {
			const byTag = values?.[0]?.data;

			callback({byTag})

		})
		.catch(function (error) {
			console.log(error);
			callback(undefined)
		})

};
