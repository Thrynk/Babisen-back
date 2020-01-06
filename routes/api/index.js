const express = require('express');
const router = express.Router();

const tournamentsRouter = require('./tournaments');
const usersRouter = require('./users');
const teamsRouter = require("./teams");
const authRouter = require('./auth');
const matchesRouter = require('./matches');

const authMiddleware = require('../../middlewares/auth');

router.use('/tournaments', authMiddleware, tournamentsRouter);

router.use('/users', usersRouter);

router.use('/teams', authMiddleware, teamsRouter);

router.use('/auth', authRouter);

router.use('/matches', matchesRouter);

module.exports = router;
