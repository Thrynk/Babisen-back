const express = require('express');
const router = express.Router();

const tournamentsRouter = require('./tournaments');
const usersRouter = require('./users');

router.use('/tournaments', tournamentsRouter);

router.use('/users', usersRouter);

module.exports = router;
