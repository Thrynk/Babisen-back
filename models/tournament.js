const mongoose = require('mongoose');

const Tournament = mongoose.model('Tournament', {
  name: String,
  date: Date,
  status: String
});

module.exports = Tournament;
