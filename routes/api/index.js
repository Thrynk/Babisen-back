const express = require('express');
const router = express.Router();

const tournamentsRouter = require('./tournaments');

router.use('/tournaments', tournamentsRouter);

module.exports = router;
