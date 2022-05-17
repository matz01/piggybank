import axios from 'axios';
import { dbPath } from '../constants';

export const getOutgoings = async (callback) => {
	const config = {
		method: 'GET',
		mode: 'no-cors',
		redirect: 'follow',
	}

	let OUTGOINGS_URL = `${dbPath}/outgoings`
	let INCOME_URL = `${dbPath}/income`

	const promise1 = axios.get(OUTGOINGS_URL, config);
	const promise2 = axios.get(INCOME_URL, config);

	Promise.all([promise1, promise2])
		.then(function(values) {
			const outgoings = values?.[0]?.data;
			const income = values?.[1]?.data;

			callback({outgoings, income})

		})
		.catch(function (error) {
			console.log(error);
			callback(undefined)
		})
};
