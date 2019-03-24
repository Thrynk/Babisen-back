const mongoose = require('mongoose');

const User = mongoose.model('User', {
  username: String,
  firstname: String,
  lastname: String,
  psid: String,
  role: String
});

module.exports = User;
