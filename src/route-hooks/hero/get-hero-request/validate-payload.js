const { INVALID_REQUEST_PAYLOAD } = require('../../../lib/error/code');
const { RequestValidationError } = require('../../../lib/error');
const {
	validator,
	generateIdSchema,
} = require('../../../lib/validation');

const checkParams = validator.compile({
	heroId: generateIdSchema(),
});

module.exports = (req, res, next) => {
	const checkResult = checkParams(req.params);

	if (checkResult !== true) {
		return next(new RequestValidationError(INVALID_REQUEST_PAYLOAD));
	}

	next();
};
