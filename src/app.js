const express = require('express');
const config = require('config');
const router = require('./routes');
const handleError = require('./middlewares/handle-error');
const logRequest = require('./middlewares/log-request');

const app = express();

app.use(logRequest);
app.use('/api/v1', router);
app.use(handleError);

app.listen(config.PORT, () => {
    console.log(`server is listening on port ${config.PORT}`);
})

