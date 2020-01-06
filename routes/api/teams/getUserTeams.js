const User = require("../../../models/user");
const Team = require("../../../models/team");

module.exports = function(req, res){
    let user_id;
    if(req.user.id){
        user_id = req.user.id;
    }
    else if(req.params.id){
        user_id = req.params.id;
    }
    else {
        res.sendStatus(422);
    }
    User.findOne({_id: user_id}, function(err, user){
        if(!err){
            if(user){
                Team.find({ _id: {$in: user.affiliationTeams} }, function(err, docs){
                   res.status(200).send(docs);
                }).catch(function(error){
                    console.log("error while trying to get teams based on ids");
                    res.sendStatus(422);
                });
            }
            else{
                res.sendStatus(404);
            }
        }
        else{
            console.log("error while trying to find user");
            res.sendStatus(422);
        }
    });
};
