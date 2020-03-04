const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const Notifications = mongoose.model('Notifications', {
    tournamentId: ObjectId,
    notifications: String,
    date: Date
});

module.exports = Notifications;