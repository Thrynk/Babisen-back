const express = require('express');
const matches = express.Router();

const newMatch = require('./newMatch');
const matchesByUserId = require('./matchesByUserId');
const allMatchesInfos = require('./allMatchesInfos');
const updateScores = require('./updateScores');

const authMiddleware = require("../../../middlewares/auth");

matches.post('/', newMatch);

matches.get('/user/:id?', matchesByUserId);

matches.get('/infos/:id?', authMiddleware, allMatchesInfos);

matches.put('/scores/:id?', updateScores);

module.exports = matches;
