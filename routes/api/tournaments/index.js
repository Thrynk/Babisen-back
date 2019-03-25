const express = require('express');
const tournaments = express.Router();

const newTournament = require('./new');
const arrivingTournament = require('./arriving')

// TOURNAMENTS
tournaments.get('/', function(req, res){

});

tournaments.post('/', newTournament);

tournaments.get('/arriving', arrivingTournament);

/*tournaments.get('')*/

module.exports = tournaments;
