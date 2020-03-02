const Tournament = require("../../../models/tournament");

module.exports = function(req, res){
    Tournament.updateOne({_id: req.params.id}, {$addToSet: {attendees: req.body.attendee} }, function(error, writeOpResult){
        if(!error){
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
