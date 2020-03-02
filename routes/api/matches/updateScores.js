const Match = require('../../../models/match');

module.exports = function(req, res){
    Match.updateOne({_id: req.body._id}, {awayScore: req.body.awayScore, homeScore: req.body.homeScore, eventStatus: req.body.eventStatus}, function(err, writeOpResult){
        if(!err){
            if(writeOpResult.n > 0 && writeOpResult.nModified > 0){
                res.sendStatus(200);
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
};
