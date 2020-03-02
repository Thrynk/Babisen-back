const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const Notifications = mongoose.model('Notifications', {
    id: Number,
    notifications: String
});

module.exports = Notifications;