const axios = require('axios');
const config = require('config');
const { 
	InternalServerError,
	AuthenticationError,
	NotFoundError,
} = require('../lib/error');
const { 
	BACKEND_ERROR,
	AUTHENTICATED_ERROR,
	NOT_FOUND_HERO,
 } = require('../lib/error/code');

/**
 * a class for Hahow API
 */
class HahowAPI  {
	constructor() {
		this.instance = axios.create({
			baseURL: config.API_BASE_URL,
		});
	}

	async auth(name, password){
		try {
			const response = await this.instance.post('/auth', {
				name,
				password,
			});

			if(response.data?.code === 1000){
				throw new InternalServerError(BACKEND_ERROR);
			}

			return true;
		} catch (error) {
			if(error.response?.status === 401) {
				throw new AuthenticationError(AUTHENTICATED_ERROR);
			}else {
				throw error;
			}
		}
	}

	async findHeroes(){
		const response = await this.instance.get('/heroes');

		return response.data;
	}

	async findHeroProfileById(id){
		const response = await this.instance.get(`/heroes/${id}/profile`);

		return response.data;
	}

	async findHeroById(id){
		try {
			const response = await this.instance.get(`/heroes/${id}`);

			if(response.data?.code === 1000){
				throw new InternalServerError(BACKEND_ERROR);
			}

			return response.data;
		} catch (error) {
			if(error.response?.status === 404) {
				throw new NotFoundError(NOT_FOUND_HERO);
			}else {
				throw error;
			}
		}
	}
}

module.exports = HahowAPI;
