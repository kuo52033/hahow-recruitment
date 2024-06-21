const validatePayload = require('./validate-payload');

exports.before = [
    validatePayload,
]