const request = require('supertest');
const { app } = require('../src/app');
const { AuthenticationError } = require('../src/lib/error');
const { AUTHENTICATED_ERROR } = require('../src/lib/error/code');

const validUser = { Name: 'hahow', Password: 'rocks' }
const invalidUser = { Name: 'hahow', Password: 'rockssss' }
const heroMatch = {
	id: expect.any(String),
	image: expect.any(String),
	name: expect.any(String),
}
const heroProfileMatch = {
	profile: {
		agi: expect.any(Number),
		int: expect.any(Number),
		luk: expect.any(Number),
		str: expect.any(Number),
    },
}

describe('hero API - get /api/v1/heroes', () => {
	test('200 ok - should return heroes list', () => {
		return request(app)
			.get('/api/v1/heroes')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.then(res => {
				res.body.heroes.forEach((hero) =>{
					expect(hero).toMatchObject(heroMatch);
				})
			});	
	});

	test('200 ok - should return heroes list with authenticated profile', () => {
		return request(app)
			.get('/api/v1/heroes')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set(validUser)
			.expect(200)
			.then(res => {
				res.body.heroes.forEach((hero) =>{
					expect(hero).toMatchObject({
						...heroMatch,
						...heroProfileMatch,
					});
				})
			});	
	});

	test('401 unauthenticated - invalid Name or Password', () => {
		return request(app)
			.get('/api/v1/heroes')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set(invalidUser)
			.expect(401)
			.then(res => {
				const error = new AuthenticationError(AUTHENTICATED_ERROR);

				expect(res.body).toMatchObject({
					type: error.constructor.name,
					message: error.message,
					code: error.code
				});
			});	
	});
});
