var express = require('express');
var router = express.Router();
var { generateToken, sendToken } = require('../../../utils/token.utils');
var passport = require('passport');
require('../../../utils/passport')();

router.route('/facebook')
    .post(passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user._id
        };

        next();
    }, generateToken, sendToken);

module.exports = router;

