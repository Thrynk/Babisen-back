const express = require('express');
const tournaments = express.Router();

const newTournament = require('./new');
const arrivingTournament = require('./arriving');
const tournamentById = require("./tournamentById");
const updateTournamentAttendee  = require("./updateAttendees");
const getNextTournaments = require("./getNextTournaments");

const getCurrentTournaments = require("./getCurrentTournaments");

const authMiddleware = require('../../../middlewares/auth');

// TOURNAMENTS
tournaments.get('/next', getNextTournaments);

tournaments.get('/current', getCurrentTournaments);

tournaments.get('/arriving', arrivingTournament);

tournaments.get('/:id', tournamentById);

tournaments.post('/', authMiddleware, newTournament);

tournaments.put('/attendee/:id', updateTournamentAttendee);

/*tournaments.get('')*/

module.exports = tournaments;
