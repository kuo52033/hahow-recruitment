 
// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, _) => {
	res.locals.error = error;
	error.code = error.code || '000';
	error.statusCode = error.statusCode || 500;

	res.status(error.statusCode).json({
		type: error.constructor.name,
		message: error.message,
		code: error.code,
	});
};
