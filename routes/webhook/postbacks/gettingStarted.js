const facebookApiService = require('../../../services/webhook/facebook-api-service');
const userService = require('../../../services/api/user-service');
const tournamentService = require('../../../services/api/tournament-service');
const callSendAPI = require('../callSendAPI');

module.exports = function (sender_psid) {
    facebookApiService.getUserProfile(sender_psid).then(function (body) {
        userService.registerUser(body, sender_psid).then(function (resolved) {
            if (resolved.response.statusCode === 200) {
                let response = "Bonjour " + resolved.body.first_name + ". Je suis Baby'bot l'assistant du Bab'isen pour vous servir !";
                return callSendAPI(sender_psid, response);
            }
            else if(resolved.response.statusCode === 422){
                let response = "Hey content de te revoir Bro !";
                return callSendAPI(sender_psid, response);
            }
        }).then(function () {
            tournamentService.sendArrivingTournamentsToUser(sender_psid);
        }).catch(function (error) {
            console.log(error);
        });
    }).catch(function (error) {
        console.log(error);
    });
}
