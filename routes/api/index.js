const express = require('express');
const router = express.Router();

const tournamentsRouter = require('./tournaments');
const usersRouter = require('./users');
const teamsRouter = require("./teams");
const authRouter = require('./auth');

router.use('/tournaments', tournamentsRouter);

router.use('/users', usersRouter);

router.use('/teams', teamsRouter);

router.use('/auth', authRouter);

module.exports = router;
