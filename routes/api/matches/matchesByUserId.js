const Match = require('../../../models/match');

module.exports = function(req, res){
    let user = req.user ? req.user : {};
    let user_id = user.id || req.params.id;

    Match.find({$or: [ {awayTeam: user_id}, {homeTeam: user_id}, {awayOpponent: user_id}, {homeOpponent: user_id} ]}, function(err, docs){
        if(!err){
            res.send(docs);
        }
        else{
            res.sendStatus(422);
        }
    });

};
