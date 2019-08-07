const express = require('express');
const tournaments = express.Router();

const newTournament = require('./new');
const arrivingTournament = require('./arriving');
const tournamentById = require("./tournamentById");
const updateTournamentAttendee  = require("./updateAttendees");
const getTournaments = require("./getTournaments")

// TOURNAMENTS
tournaments.get('/', getTournaments);

tournaments.get('/arriving', arrivingTournament);

tournaments.get('/:id', tournamentById);

tournaments.post('/', newTournament);

tournaments.put('/attendee/:id', updateTournamentAttendee);

/*tournaments.get('')*/

module.exports = tournaments;
