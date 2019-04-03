const facebookApiService = require('../../../services/webhook/facebook-api-service');
const userService = require('../../../services/api/user-service');
const tournamentService = require('../../../services/api/tournament-service');

module.exports = function(sender_psid){
  facebookApiService.getUserProfile(sender_psid).then(function(body){
    userService.registerUser()
  }).catch(function(error){
    console.log(error);
  });
}
