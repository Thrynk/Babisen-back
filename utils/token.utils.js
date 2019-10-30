const jwt = require("jsonwebtoken");

var createToken = function(auth) {
    console.log(auth.id);
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

module.exports = {
    generateToken: function(req, res, next) {
        req.token = createToken(req.auth);
        return next();
    },
    sendToken: function(req, res) {
        //res.setHeader('x-auth-token', req.token);

        let cookieSignatureConfig = {
            httpOnly: true,
            secure: false
        };

        let cookieHeaderPayloadConfig = {
          secure: false,
          maxAge: 1000 * 60 * 30
        };

        let tokenParts = req.token.split('.');

        let headerPayload = tokenParts[0] + "." + tokenParts[1];

        let signature = tokenParts[2];

        res.cookie('headerPayload', headerPayload, cookieHeaderPayloadConfig);

        res.cookie('signature', signature, cookieSignatureConfig);

        return res.status(200).send(JSON.stringify(req.user));
    }
};
