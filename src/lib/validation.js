const Validator = require('fastest-validator');

const validator = new Validator();

/**
 * https://github.com/icebob/fastest-validator?tab=readme-ov-file#number
 * @param {Object} args
 * @returns {{empty: boolean, convert: boolean, type: string, integer: boolean, positive: boolean}}
 */
function generateIdSchema(args = {}) {
	return {
		type: 'number',
		empty: false,
		integer: true,
		positive: true,
		convert: true,
		...args,
	};
}

module.exports = {
	validator,
	generateIdSchema,
};
