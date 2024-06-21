const request = require('supertest');
const { app } = require('../src/app');
const { 
	AuthenticationError,
	NotFoundError,
	RequestValidationError,
	InternalServerError,
 } = require('../src/lib/error');
const { 
	AUTHENTICATED_ERROR,
	NOT_FOUND_HERO,
	INVALID_REQUEST_PAYLOAD,
	BACKEND_ERROR,
 } = require('../src/lib/error/code');

const validUser = { Name: 'hahow', Password: 'rocks' }
const invalidUser = { Name: 'hahow', Password: 'rockssss' }
const backEndError = new InternalServerError(BACKEND_ERROR);
const authenticatedError = new AuthenticationError(AUTHENTICATED_ERROR);
const notfoundHeroError = new NotFoundError(NOT_FOUND_HERO);
const invalidPayloadError = new RequestValidationError(INVALID_REQUEST_PAYLOAD);
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
const errorMatch = (res, error) => {
	expect(res.body).toMatchObject({
		type: error.constructor.name,
		message: error.message,
		code: error.code
	});
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

	test('200 ok - should return heroes list with authenticated profile || 500 backend error', () => {
		return request(app)
			.get('/api/v1/heroes')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set(validUser)
			.expect([200, 500])
			.then(res => {
				if(res.statusCode === 500){
					errorMatch(res, backEndError);
				}else {
					res.body.heroes.forEach((hero) =>{
						expect(hero).toMatchObject({
							...heroMatch,
							...heroProfileMatch,
						});
					})
				}
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
				errorMatch(res, authenticatedError);
			});	
	});
});

describe('hero API - get /api/v1/heroe/id=:heroId', () => {
	test('200 ok - should return hero || 500 backend error', () => {
		return request(app)
			.get('/api/v1/heroes/id=3')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect([200, 500])
			.then(res => {
				if(res.statusCode === 500) {
					errorMatch(res, backEndError);
				}else{
					expect(res.body).toMatchObject(heroMatch);
				}
			});	
	});

	test('200 ok - should return hero with authenticated profile || 500 backend error', () => {
		return request(app)
			.get('/api/v1/heroes/id=3')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set(validUser)
			.expect([200, 500])
			.then(res => {
				if(res.statusCode === 500) {
					errorMatch(res, backEndError);
				}else{
					expect(res.body).toMatchObject({
						...heroMatch,
						...heroProfileMatch,
					});
				}
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
				errorMatch(res, authenticatedError);
			});	
	});

	test('404 not found - not found hero || 500 backend error', () => {
		return request(app)
			.get('/api/v1/heroes/id=800')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set(validUser)
			.expect([404, 500])
			.then(res => {
				if(res.statusCode === 500) {
					errorMatch(res, backEndError);
				}else{
					errorMatch(res, notfoundHeroError);
				}
			});	
	});

	test('422 unprocessable entity - invalid request payload || 500 backend error', () => {
		return request(app)
			.get('/api/v1/heroes/id=test')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set(validUser)
			.expect([422, 500])
			.then(res => {
				if(res.statusCode === 500) {
					errorMatch(res, backEndError);
				}else{
					errorMatch(res, invalidPayloadError);
				}
			});	
	});
});
