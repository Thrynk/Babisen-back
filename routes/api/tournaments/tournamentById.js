const Tournament = require("../../../models/tournament");

module.exports = function(req, res){
    Tournament.findById(req.params.id, function(err, tournament){
        if(!err){
            res.status(200).send(tournament);
        }
        else{
            console.log(err);
            res.sendStatus(404);
        }
    });
}
