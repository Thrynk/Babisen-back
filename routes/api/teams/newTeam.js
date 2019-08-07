const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

const Team = require("../../../models/team");
const User = require("../../../models/user");

module.exports = function (req, res) {
    Team.findOne(req.body.team, function (err, teamRead) {
        console.log(teamRead === null);
        if(teamRead === null){
            let team = new Team(req.body.team);
            team.athletes = [ ObjectId(req.body.users[0]), ObjectId(req.body.users[1]) ];
            team.save().then(function() {
                console.log(team);
                User.updateMany({_id: {$in: [ ObjectId(req.body.users[0]), ObjectId(req.body.users[1]) ]} }, { $addToSet: {affiliationTeams: team._id} }, function (error, writeOpResult) {
                    if(!error){
                        if(writeOpResult.n > 0 && writeOpResult.nModified > 0){
                            res.status(200).send(team);
                        }
                        else if(writeOpResult.n > 0 && writeOpResult.nModified === 0){
                            res.sendStatus(409);
                        }
                        else{
                            res.sendStatus(404);
                        }
                    }
                    else{
                        res.sendStatus(400);
                    }
                });
            }).catch(function (err) {
                console.log("Error : " + err);
                res.sendStatus(422);
            });
        }
        else {
            res.sendStatus(422);
        }
    });
};
