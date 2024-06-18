const axios = require('axios');
const config = require('config');

/**
 * Send a GET request to Hahow API
 * @param {String} path - path of url
 * @returns {Promise}
 */
async function sendGetRequestToHahowAPI(path) {
	try {
		const response = await axios.get(`${config.API_BASE_URL}${path}`);

		return response.data;
	} catch (error) {
		throw new Error(error);
	}
}

module.exports = {
	sendGetRequestToHahowAPI
};
