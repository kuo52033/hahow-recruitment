const config = require('config');
const { app } = require('./app');

app.listen(config.PORT, () => {
	console.log(`server is listening on port ${config.PORT}`);
});
