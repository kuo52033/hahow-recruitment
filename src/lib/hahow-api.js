const axios = require('axios');
const config = require('config');

/**
 * a class for Hahow API
 */
class HahowAPI {
	constructor() {
		this.instance = axios.create({
			baseURL: config.API_BASE_URL,
			timeout: 2500,
		});
	}

	async auth(name, password){
		try {
			const response = await this.instance.post('/auth', {
				name,
				password,
			});

			if(response.data?.code === 1000){
				throw new Error('backend error');
			}

			return true;
		} catch (error) {
			if(axios.isAxiosError(error)) {
				throw error;
			}else {
				throw new Error(error);
			}
		}
	}

	async findHeroes(){
		try {
			const response = await this.instance.get('/heroes');

			return response.data;
		} catch (error) {
			if(axios.isAxiosError(error)) {
				throw error;
			}else {
				throw new Error(error);
			}
		}
	}
}

module.exports = HahowAPI;
