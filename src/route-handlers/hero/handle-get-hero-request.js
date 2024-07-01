const { getHeroById, getAuthenticatedHeroById } = require('../../service/hero');

module.exports = async (req, res, next) => {
	const { isAuth } = res.locals;
	const { heroId } = req.params;
	let hero;

	try {
		if (isAuth === true) {
			hero = await getAuthenticatedHeroById(heroId);
		} else {
			hero = await getHeroById(heroId);
		}

		res.status(200).json(hero);
	} catch (error) {
		next(error);
	}
};
