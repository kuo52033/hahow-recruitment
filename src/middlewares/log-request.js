const onFinished = require('on-finished');

module.exports = (req, res, next) => {
	const startTime = new Date();

	const onFinishedHandler = (error, res) => {
		const finishTime = new Date();
		const processTimeInMillisecond = finishTime - startTime;
		const message = `[${res.statusCode}] ${processTimeInMillisecond}ms ${req.method} ${req.originalUrl}`;

		console.log(message);
		
		if (res.locals.error) {
			console.error(res.locals.error);
		} 
	};

	onFinished(res, onFinishedHandler);

	next();
};
