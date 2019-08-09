const tournamentService = require("../../../services/api/tournament-service");

module.exports = function(sender_psid){
    tournamentService.getTournaments().then(function(tournaments){
        console.log(tournaments);
    }).catch(function(error){
        console.log("error while trying to get nex tournaments");
    });
};
