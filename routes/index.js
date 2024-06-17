const express = require('express');

const router = new express.Router();

router.use('/heroes', require('./hero'));

module.exports = router;
