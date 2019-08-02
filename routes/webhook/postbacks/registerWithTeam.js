const tournamentService = require("../../../services/api/tournament-service");
const userService = require("../../../services/api/user-service");
const callSendAPI = require("../callSendAPI");

module.exports = function(sender_psid, tournamentId){
    userService.getUserBySenderPsid(sender_psid).then(function(user){
        console.log(user, user.affiliationTeam);
        if(user.affiliationTeam){

        }
        else {
            var response = "Vous n'avez pas d'équipe.";
            callSendAPI(sender_psid, response);
        }
    }).catch(function(error){
        console.log("error when trying to get user by psid");
    });
};
