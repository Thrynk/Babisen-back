'use strict';

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
const userService = require("../services/api/user-service");

module.exports = function () {
    passport.use(new FacebookTokenStrategy({
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret
        },
        function (accessToken, refreshToken, profile, done) {
            let user = {
              first_name: profile._json.first_name,
              last_name: profile._json.last_name
            };
            userService.registerUser(user).then(function(resolved){
                return done(null, resolved.body);
            });
        }));
};
