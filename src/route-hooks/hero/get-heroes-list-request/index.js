const { isLoggedIn } = require('../../common');

exports.before = [
	isLoggedIn,
];
