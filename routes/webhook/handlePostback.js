const callSendAPI = require('./callSendAPI');

function askTemplate(text) {
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Cats",
                        "payload":"CAT_PICS"
                    },
                    {
                        "type":"postback",
                        "title":"Dogs",
                        "payload":"DOG_PICS"
                    }
                ]
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
    response = askTemplate('Are you a Cat or Dog Person?');
    callSendAPI(sender_psid, response);
  }
};
