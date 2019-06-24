const gettingStartedPostback = require('./postbacks/gettingStarted');
const registerTournament = require('./postbacks/registerTournament');

// Handles messaging_postbacks events
module.exports = function handlePostback(sender_psid, received_postback) {
  console.log(received_postback);

  // Get the payload for the postback
  let payload = received_postback.payload;

  if(payload === 'GET_STARTED'){
    gettingStartedPostback(sender_psid);
  }
  else if(payload.match(/REGISTER_TOURNAMENT\//) !== null){
    let payloadParts = payload.split("/");
    console.log(payloadParts[1]);
    registerTournament(sender_psid, payloadParts[1]);
  }
  else if(payload === 'INFORMATIONS'){

  }
};
