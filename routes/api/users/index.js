const express = require('express');
const users = express.Router();

const register = require('./register');
const userByPsid = require('./userByPsid')
const me = require('./me');

const authMiddleware = require("../../../middlewares/auth");

users.get('/me', authMiddleware, me);

users.get('/sender_psid/:sender_psid', userByPsid);

users.post('/register', register);

module.exports = users;
