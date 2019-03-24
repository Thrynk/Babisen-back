const mongoose = require('mongoose');

const Tournament = mongoose.model('Tournament', {
  name: String,
  date: Date
});

module.exports = Tournament;
