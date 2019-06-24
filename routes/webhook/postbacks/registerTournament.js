const tournamentService = require("../../../services/api/tournament-service");

module.exports = function(sender_psid, tournamentId){
    tournamentService.getTournamentById(tournamentId).then(function(response){
        console.log(response);
    })
}
