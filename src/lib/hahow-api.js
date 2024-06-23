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

class HahowAPI  {
	constructor() {
		this.instance = axios.create({
			baseURL: config.API_BASE_URL,
		});
	}

	/**
	 * @param {string} name 
	 * @param {string} password 
	 * @returns {boolean}
	 * @throws {InternalServerError} - if API return code 1000
	 * @throws {AuthenticationError} - if name or password invalid
	 */
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

	/**
	 * @returns {Array<{{id: string, name: string, image: string}}>}
	 */
	async findHeroes(){
		const response = await this.instance.get('/heroes');

		return response.data;
	}

	/**
	 * 
	 * @param {number|string} id 
	 * @returns {{str: number, int: number, agi: number, luk: number}}
	 */
	async findHeroProfileById(id){
		const response = await this.instance.get(`/heroes/${id}/profile`);

		return response.data;
	}

	/**
	 * @param {number|string} id 
	 * @returns {{id: string, name: string, image: string}}
	 * @throws {InternalServerError} - if API return code 1000
	 * @throws {NotFoundError} - if hero not found
	 */
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
