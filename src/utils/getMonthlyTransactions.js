import axios from 'axios';
import { dbPath } from '../constants';

export const getMonthlyTransactions = (month, callback) => {

		axios.get(`${dbPath}/monthly`, {
			method: 'GET',
			mode: 'no-cors',
			redirect: 'follow',
			params: {
				month,
			}
		})
			.then(function (response) {
				callback(response?.data);

			})
			.catch(function (error) {
				console.log(error);
			})
}
