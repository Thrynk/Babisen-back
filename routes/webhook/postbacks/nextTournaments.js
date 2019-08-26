const tournamentService = require("../../../services/api/tournament-service");
const carousel = require("../carousel");
const callSendAPI = require("../callSendAPI");

module.exports = function(sender_psid){
    tournamentService.getTournaments().then(function(tournaments){
        console.log(tournaments);
        let elements = [];
        var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minutes: 'numeric' };
        JSON.parse(tournaments).forEach(function(tournament){
            let element = {
                title: tournament.name + " (du " + (new Date(tournament.startDate)).toLocaleDateString("fr-FR", options) + " au " + (new Date(tournament.endDate)).toLocaleString("fr-FR", options) + ")"
            };

            element.subtitle = (tournament.isSolo ? "Solo " : "Duo ") + (tournament.isAccessibleForFree ? "Gratuit" : "Payant");
            element.subtitle += "\n" + "Capacité max. : " + tournament.maximumAttendeeCapacity + " Places rest. : " + tournament.remainingAttendeeCapacity;
            element.subtitle += "\n" + "lim. d'inscr. " + (new Date(tournament.doorTime)).toLocaleDateString("fr-FR", { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minutes: 'numeric' });

            //TODO : put location of the event

            if(tournament.imgUrl){
                element.image_url = tournament.imgUrl;
            }

            element.buttons = [
                {
                    "type":"postback",
                    "title":"S'inscire",
                    "payload":"REGISTER_TOURNAMENT/" + tournament._id
                }
            ];

            elements.push(element);
        });

        let response = carousel(elements);
        callSendAPI(sender_psid, response).then(function(status){
            console.log(status);
        }).catch(function(err){
            console.log(err);
        });
    }).catch(function(error){
        console.log("error while trying to get nex tournaments");
        console.error(error);
    });
};
