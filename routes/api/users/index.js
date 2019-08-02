const express = require('express');
const users = express.Router();

const register = require('./register');
const userByPsid = require('./userByPsid')

// TOURNAMENTS
users.get('/', function(req, res){

});

users.get('/sender_psid/:sender_psid', userByPsid);

users.post('/register', register);

/*tournaments.get('')*/

module.exports = users;
