const HahowAPI = require('../lib/hahow-api')

/**
 * validate name and password
 * @returns {function(req, res, next)}
 */
function isLoggedIn() {
	return async (req, res, next) => {
		// question
		const name = req.header('Name');
		const password = req.header('Password');

		if (!name||!password) {
            return next();
		}
		
		const api = new HahowAPI();

		try {
			res.locals.isAuth = await api.auth(name, password);
		} catch (error) {
			return next(error);
		}

		next();
	};
}

module.exports = {
    isLoggedIn,
}