const validatePayload = require('./validate-payload');
const { isLoggedIn } = require('../../common');

exports.before = [
	validatePayload,
	isLoggedIn,
];
