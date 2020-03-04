const Tournament = require("../../../models/tournament");

const User = require("../../../models/user");

const Team = require("../../../models/team");

module.exports = function(req, res){
    Tournament.findById(req.params.id, function(err,  tournament){
        //console.log(tournament);

        if(tournament.isSolo){
            User.find({
                '_id': {
                    $in: tournament.attendees
                }
            }, function(err, docs){
                //console.log(docs);
                res.send(docs);
            });
        }
        else {
            Team.find({
                '_id': {
                    $in: tournament.attendees
                }
            }, function(err, docs){
                //console.log(docs);
                res.send(docs);
            });
        }


    })
};
