const express = require('express');
const config = require('config');
const router = require('./routes');

const app = express();

app.use('/api/v1', router);

app.listen(config.PORT, () => {
    console.log(`server is listening on port ${config.PORT}`);
})

