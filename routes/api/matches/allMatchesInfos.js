const Match = require('../../../models/match');

module.exports = function(req, res){
    let user = req.user ? req.user : {};
    let user_id = user.id || req.params.id;

    //console.log(user_id);

    let numberOfTotalMatches, numberOfTotalMatchesWon;

    Match.find({$or: [ {awayTeam: user_id}, {homeTeam: user_id}, {awayOpponent: user_id}, {homeOpponent: user_id} ]}, function(err, docs){
        if(!err){
            numberOfTotalMatches = docs.length;
            const matchesWon = docs.filter(function(match){
               if(match.type === "solo" && match.eventStatus === "complete"){
                   if(String(match.awayOpponent) === user_id){
                       return match.awayScore > match.homeScore;
                   }
                   else if(String(match.homeOpponent) === user_id){
                       return match.homeScore > match.awayScore;
                   }
               }
               else{
                   //TODO : Look if one of user's teams is away or home team
               }
            });
            numberOfTotalMatchesWon = matchesWon.length;

            res.send({numberOfTotalMatches, numberOfTotalMatchesWon});
        }
        else{
            res.sendStatus(422);
        }
    });

};
