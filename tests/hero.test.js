const request = require('supertest');
const { app } = require('../src/app');
const { 
	AuthenticationError,
	NotFoundError,
	RequestValidationError,
 } = require('../src/lib/error');
const { 
	AUTHENTICATED_ERROR,
	NOT_FOUND_HERO,
	INVALID_REQUEST_PAYLOAD,
 } = require('../src/lib/error/code');

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

describe('hero API - get /api/v1/heroe/id=:heroId', () => {
	test('200 ok - should return hero', () => {
		return request(app)
			.get('/api/v1/heroes/id=3')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.then(res => {
				expect(res.body).toMatchObject(heroMatch);
			});	
	});

	test('200 ok - should return hero with authenticated profile', () => {
		return request(app)
			.get('/api/v1/heroes/id=3')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set(validUser)
			.expect(200)
			.then(res => {
				expect(res.body).toMatchObject({
					...heroMatch,
					...heroProfileMatch,
				});
			});	
	});

	test('401 unauthenticated - invalid Name or Password', () => {
		return request(app)
			.get('/api/v1/heroes/id=3')
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

	test('404 not found - not found hero', () => {
		return request(app)
			.get('/api/v1/heroes/id=800')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set(validUser)
			.expect(404)
			.then(res => {
				const error = new NotFoundError(NOT_FOUND_HERO);

				expect(res.body).toMatchObject({
					type: error.constructor.name,
					message: error.message,
					code: error.code
				});
			});	
	});

	test('422 unprocessable entity - invalid request payload', () => {
		return request(app)
			.get('/api/v1/heroes/id=test')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set(validUser)
			.expect(422)
			.then(res => {
				const error = new RequestValidationError(INVALID_REQUEST_PAYLOAD);

				expect(res.body).toMatchObject({
					type: error.constructor.name,
					message: error.message,
					code: error.code
				});
			});	
	});
});
