const tournamentService = require("../../../services/api/tournament-service");
const callSendAPI = require("../callSendAPI");

module.exports = function(sender_psid, tournamentId, teamId){
    tournamentService.registerTeamToTournament(tournamentId, teamId).then(function(status){
        if(status === 200){
            let response = "Votre equipe est bien inscrite au tournoi";
            callSendAPI(sender_psid, response);
        }
        else if(status === 409){
            let response = "Votre equipe est deja inscrite au tournoi";
            callSendAPI(sender_psid, response);
        }
    }).catch(function(error){
        console.log("error while trying to register team in tournament")
    });
};
