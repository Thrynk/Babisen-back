const express = require('express');
const tournaments = express.Router();

const newTournament = require('./new');
const arrivingTournament = require('./arriving');
const tournamentById = require("./tournamentById");

// TOURNAMENTS
tournaments.get('/', function(req, res){

});

tournaments.get('/:id', tournamentById);

tournaments.post('/', newTournament);

tournaments.get('/arriving', arrivingTournament);

/*tournaments.get('')*/

module.exports = tournaments;
