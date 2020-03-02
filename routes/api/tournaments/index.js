const express = require('express');
const tournaments = express.Router();

const newTournament = require('./new');
const arrivingTournament = require('./arriving');
const tournamentById = require("./tournamentById");
const addTournamentAttendee  = require("./addAttendee");
const removeTournamentAttendee = require("./removeAttendee");
const getNextTournaments = require("./getNextTournaments");
const getCurrentTournaments = require("./getCurrentTournaments");
const getFinishedTournaments = require("./getFinishedTournaments");
const getAttendees = require("./getAttendees");

const authMiddleware = require('../../../middlewares/auth');

// TOURNAMENTS
tournaments.get('/next', getNextTournaments);

tournaments.get('/current', getCurrentTournaments);

tournaments.get('/finished', getFinishedTournaments);

tournaments.get('/arriving', arrivingTournament);

tournaments.get('/:id', tournamentById);

tournaments.get('/attendees/:id', getAttendees);

tournaments.post('/', authMiddleware, newTournament);

tournaments.put('/attendee/add/:id', authMiddleware, addTournamentAttendee);

tournaments.put('/attendee/remove/:id', authMiddleware, removeTournamentAttendee);

module.exports = tournaments;
