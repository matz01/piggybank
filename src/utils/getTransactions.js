const axios = require('axios');
const { dbPath } = require('../constants');

export const getTransactions = async (callback) => {

	axios.get(`${dbPath}/budget`, {
		method: 'GET',
		mode: 'no-cors',
		redirect: 'follow'
	})
		.then(function (response) {
			callback(response?.data);
		})
		.catch(function (error) {
			console.log(error);
		});
};
