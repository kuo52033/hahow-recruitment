const express = require('express');
const { isLoggedIn } = require('../route-hooks/common')

const router = new express.Router();

router.use(isLoggedIn());

router.use('/heroes', require('./hero'));

module.exports = router;
