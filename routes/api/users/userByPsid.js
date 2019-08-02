const User = require("../../../models/user");

module.exports = function(req, res){
    User.findOne({psid: req.params.sender_psid}, function(err, user){
        if(!err){
            if(user){
                res.status(200).send(user);
            }
            else{
                res.sendStatus(404);
            }
        }
        else{
            res.sendStatus(400);
        }
    });
}
