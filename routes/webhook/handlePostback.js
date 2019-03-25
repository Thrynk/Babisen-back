const request = require('request');
const callSendAPI = require('./callSendAPI');

const User = require('../../models/user');

const accessToken = process.env.FB_ACCESS_TOKEN;

function askTemplate(text, ...buttons) {
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

// Handles messaging_postbacks events
module.exports = function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  if(payload === 'GET_STARTED'){
    var user_content;
    /*response = askTemplate("Veux-tu des informations sur l'association ou t'inscrire pour recevoir les nouveautés(tournois, événements, etc...)",
      {
        payload: "INFORMATIONS",
        title: "Informations",
        type: "postback"
      },
      {
        payload: "SUBSCRIBE",
        title: "S'inscrire",
        type: "postback"
      }
    );*/

    request({
      "uri": "https:\/\/graph.facebook.com\/" + sender_psid,
      "qs" : {
        "fields" : "first_name,last_name,profile_pic",
        "access_token" : accessToken
      },
      "method" : "GET"
    },
    function(err, res, body){
      if(!err){
        user_content = JSON.parse(body);
        User.findOne({first_name: user_content.first_name, last_name: user_content.last_name}, function(err, user){
          if(!user){
            request({
              headers: {
                "Content-Type": "application/json"
              },
              uri: process.env.URL + "/api/users/register",
              method: "POST",
              json: {
                "first_name": user_content.first_name,
                "last_name": user_content.last_name,
                "psid": sender_psid,
                "role": "user"
              }
            }, function(err, res, request_body){
              if(!err){
                response = "Bonjour " + request_body.first_name + ". Je suis Baby'bot l'assistant du Bab'isen pour vous servir !";
                console.log(response);
                // Prochain tournoi
              }
              else{
                console.log(err);
              }
            });
          }
          else{
            response = "Bonjour " + user.first_name + ". Bon retour parmi nous !";
            console.log(response);
            // + prochain évenement
          }
        });
      }
      else{
        console.log(error);
      }
    });
    console.log(response);
    callSendAPI(sender_psid, response);
  }
  else if(payload === 'INFORMATIONS'){

  }
};
