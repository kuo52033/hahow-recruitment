const express = require('express');

const router = new express.Router();
const {
	beforeGetHeroRequest,
} = require('../route-hooks/hero')
const {
	handleGetHeroesListRequest,
	handleGetHeroRequest,
} = require('../route-handlers/hero');

router.get(
	'/',
	handleGetHeroesListRequest,
);

router.get(
	'/id=:heroId',
	beforeGetHeroRequest,
	handleGetHeroRequest,
)

module.exports = router;
