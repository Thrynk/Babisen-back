const facebookApiService = require('../../../services/webhook/facebook-api-service');
const userService = require('../../../services/api/user-service');
const tournamentService = require('../../../services/api/tournament-service');
const callSendAPI = require('../callSendAPI');

function askTemplateButtons(text, ...buttons) {
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons": JSON.stringify(buttons)
            }
        }
    }
}

module.exports = function(sender_psid){
  facebookApiService.getUserProfile(sender_psid).then(function(body){
    userService.registerUser(body, sender_psid).then(function(resolved){
      if(resolved.response.statusCode === 200){
        response = "Bonjour " + resolved.body.first_name + ". Je suis Baby'bot l'assistant du Bab'isen pour vous servir !";
        callSendAPI(sender_psid, response);
      }
    }).then(function(){
      tournamentService.getArrivingTournament().then(function(body){
        if(body){
          var date = new Date(body.date.replace('.000', ''));
          response = askTemplateButtons("Le prochain tournoi: " + body.name + " est le " + date.toString() + ". Voulez-vous participer ?",
            {
              payload: "REGISTER_TOURNAMENT",
              title: "Oui !",
              type: "postback"
            },
            {
              payload: "DONT_REGISTER_TOURNAMENT",
              title: "Non !",
              type: "postback"
            }
          );
          callSendAPI(sender_psid, response);
        }
        else{
          callSendAPI(sender_psid, "Aucun tournoi de prévu pour le moment. :/");
        }
      })
    }).catch(function(error){
      console.log(error);
    });
  }).catch(function(error){
    console.log(error);
  });
}
