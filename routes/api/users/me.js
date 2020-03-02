const User = require("../../../models/user");

module.exports = function(req, res){
    User.findOne({_id: req.user.id}, function(err, user){
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
};
