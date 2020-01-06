const express = require('express');
const teams = express.Router();

const newTeam = require("./newTeam");
const getUserTeams = require("./getUserTeams");

teams.post('/', newTeam);

teams.get('/user/:id?', getUserTeams);

module.exports = teams;
