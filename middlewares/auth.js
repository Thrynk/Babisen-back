const jwt = require("jsonwebtoken");

module.exports =  function (req, res, next){
    //console.log("Cookie header : ", req.get('Cookie'));
    //console.log("Cookies : ", req.cookies);
    let authHeaderContent = req.get('authorization');
    if(authHeaderContent && authHeaderContent.startsWith('Bearer ')){
        let token = authHeaderContent.slice(7);

        jwt.verify(token, 'my-secret', function(err, decoded){
            if(!err){
                req.user = {
                    id: decoded.id
                };
                next();
            }
            else{
                //console.log(err);
                res.sendStatus(401);
            }
        });
    }
    else if(req.cookies.headerPayload && req.cookies.signature){
        let token = req.cookies.headerPayload + "." + req.cookies.signature;
        console.log(token);
        jwt.verify(token, 'my-secret', function(err, decoded){
            if(!err){
                console.log(decoded);
                req.user = {
                    id: decoded.id
                };
                console.log(req.user.id);
                next();
            }
            else{
                //console.log(err);
                res.sendStatus(401);
            }
        });
    }
    else {
        res.sendStatus(401);
    }

};
