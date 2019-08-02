const gettingStartedPostback = require('./postbacks/gettingStarted');
const registerTournament = require('./postbacks/registerTournament');
const registerWithTeam = require('./postbacks/registerWithTeam');

// Handles messaging_postbacks events
module.exports = function handlePostback(sender_psid, received_postback) {

  // Get the payload for the postback
  let payload = received_postback.payload;

  if(payload === 'GET_STARTED'){
    gettingStartedPostback(sender_psid);
  }
  else if(payload.match(/REGISTER_TOURNAMENT\//) !== null){
    let payloadParts = payload.split("/");
    registerTournament(sender_psid, payloadParts[1]);
  }
  else if(payload.match(/REGISTER_WITH_TEAM/) !== null){
    let payloadParts = payload.split("/");
    registerWithTeam(sender_psid, payloadParts[1]);
  }
  else if(payload === 'INFORMATIONS'){

  }
};
