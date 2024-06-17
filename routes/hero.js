const express = require('express');

const router = new express.Router();
// const {
// } = require('../../route-hooks');
const {
	handleGetHeroesListRequest,
} = require('../route-handlers/hero/index');

router.get(
	'/',
	handleGetHeroesListRequest,
);

module.exports = router;
