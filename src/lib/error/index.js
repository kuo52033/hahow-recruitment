class AuthenticationError extends Error {
	/**
	 * @param {{CODE: string, MESSAGE: string}} message
	 */
	constructor(message) {
		super(message);

		this.statusCode = 401;
		this.code = message?.CODE;
		this.message = message?.MESSAGE;
	}
}

class NotFoundError extends Error {
	/**
	 * @param {{CODE: string, MESSAGE: string}} message
	 */
	constructor(message) {
		super(message);

		this.statusCode = 404;
		this.code = message?.CODE;
		this.message = message?.MESSAGE;
	}
}

class InternalServerError extends Error {
	/**
	 * @param {{CODE: string, MESSAGE: string}} message
	 */
	constructor(message) {
		super(message);

		this.statusCode = 500;
		this.code = message?.CODE;
		this.message = message?.MESSAGE;
	}
}

module.exports = {
	AuthenticationError,
	NotFoundError,
	InternalServerError,
};
