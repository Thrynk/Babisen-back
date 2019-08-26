const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const User = mongoose.model('User', {
  first_name: String,
  last_name: String,
  psid: String,
  role: String,
  affiliationTeams: [ObjectId],

});

module.exports = User;
