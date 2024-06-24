const HahowAPI = require('../lib/hahow-api');

function getHeroesList() {
	const api = new HahowAPI();

	return api.findHeroes();
}

async function getAuthenticatedHeroesList() {
	const api = new HahowAPI();

	const heroesList = await api.findHeroes();

	if (!heroesList.length) {
		return [];
	}

	return Promise.all(heroesList.map(async hero =>{
		const profile = await api.findHeroProfileById(hero.id);

		return { ...hero, profile };

	}));
}

function getHeroById(id) {
	const api = new HahowAPI();

	return api.findHeroById(id);
}

async function getAuthenticatedHeroById(id) {
	const api = new HahowAPI();

	const hero = await api.findHeroById(id);

	const profile = await api.findHeroProfileById(id);

	return { ...hero, profile };
}

module.exports = {
	getHeroesList,
	getAuthenticatedHeroesList,
	getHeroById,
	getAuthenticatedHeroById,
};
