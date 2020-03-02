const Tournament = require("../../../models/tournament");

const User = require("../../../models/user");

module.exports = function(req, res){
    Tournament.findById(req.params.id, function(err,  tournament){
        //console.log(tournament);

        User.find({
            '_id': {
                $in: tournament.attendees
            }
        }, function(err, docs){
            //console.log(docs);
            res.send(docs);
        });
    })
};
