const HahowAPI = require('../lib/hahow-api')

/**
 * validate name and password, update res.locals.isAuth
 */
async function isLoggedIn(req, res, next) {
	const name = req.header('Name');
	const password = req.header('Password');

	if (!name||!password) {
		res.locals.isAuth = false;
		return next();
	}

	try {
		const api = new HahowAPI();
		
		await api.auth(name, password);

		res.locals.isAuth = true;

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = {
    isLoggedIn,
}