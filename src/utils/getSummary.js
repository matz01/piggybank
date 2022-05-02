import axios from 'axios';
import { dbPath } from '../constants';


export const getSummary = async (month, budget, callback) => {
	axios.get(`${dbPath}/monthly`, {
		method: 'GET',
		mode: 'no-cors',
		redirect: 'follow',
		params: {
			month,
		}
	})
		.then(function (response) {

			const res = budget.map(item => {
				const allSpent = response?.data || []
				const spent = allSpent.find(o => o.id === item.id)?.total || 0
				const max = item[`m${month}`]
				return {...item, spent, max}
			})
			callback(res);
		})
		.catch(function (error) {
			console.log(error);
			callback([])
		})
};
