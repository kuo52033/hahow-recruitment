const express = require('express');
const router = require('./routes');
const handleError = require('./middlewares/handle-error');
const logRequest = require('./middlewares/log-request');

const app = express();

app.use(logRequest);
app.use('/api/v1', router);
app.use(handleError);

module.exports = { app };
