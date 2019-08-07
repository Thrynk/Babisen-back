const express = require('express');
const router = express.Router();

const tournamentsRouter = require('./tournaments');
const usersRouter = require('./users');
const teamsRouter = require("./teams");

router.use('/tournaments', tournamentsRouter);

router.use('/users', usersRouter);

router.use('/teams', teamsRouter);

module.exports = router;
