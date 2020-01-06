const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const Match = mongoose.model('Match', {
    awayTeam: ObjectId,
    homeTeam: ObjectId,
    awayOpponent: ObjectId,
    homeOpponent: ObjectId,
    awayScore: Number,
    homeScore: Number,
    type: String,
    startDate: Date,
    endDate: Date,
    eventStatus: String,
    location: ObjectId,
    superEvent: ObjectId,
    recordedIn: String
});

module.exports = Match;
