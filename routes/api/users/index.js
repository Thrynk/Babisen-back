const express = require('express');
const users = express.Router();

const register = require('./register');

// TOURNAMENTS
users.get('/', function(req, res){

});

users.post('/register', register);

/*tournaments.get('')*/

module.exports = users;
