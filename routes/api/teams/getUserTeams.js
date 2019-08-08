const User = require("../../../models/user");
const Team = require("../../../models/team");

module.exports = function(req, res){
    User.findOne({_id: req.params.id}, function(err, user){
        if(!err){
            if(user){
                console.log(user.affiliationTeams);
                Team.find({ _id: {$in: user.affiliationTeams} }, function(err, docs){
                   console.log(docs);
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
