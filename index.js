const express = require('express');
const config = require('config');

const app = express();

app.listen(config.PORT, () => {
    console.log(`server is listening on port ${config.PORT}`);
})

