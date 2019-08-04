const callSendAPI = require("../callSendAPI");
import tournamentService from '../../../services/api/tournament-service';

module.exports = function(sender_psid, tournamentId){
    console.log(tournamentId);
    tournamentService.registerUserToTournament(tournamentId, sender_psid)/*.then(function(status){
        if(status === 200){
            callSendAPI(sender_psid, "Vous êtes bien inscrit au tournoi");
        }
        else if(status === 409){
            callSendAPI(sender_psid, "Vous êtes déjà inscrit à ce tournoi");
        }
    }).catch(function (error) {
        callSendAPI(sender_psid, "Une erreur est survenue lors de l'inscription, veuillez contacter un membre de Bab'isen, nous nous excusons par avance");
        console.log(error);
    })*/;
}
