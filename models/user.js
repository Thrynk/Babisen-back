const mongoose = require('mongoose');

const User = mongoose.model('User', {
  first_name: String,
  last_name: String,
  psid: String,
  role: String
});

module.exports = User;
