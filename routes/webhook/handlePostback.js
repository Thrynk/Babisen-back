const gettingStartedPostback = require('./postbacks/gettingStarted');
const registerTournament = require('./postbacks/registerTournament');
const registerWithTeam = require('./postbacks/registerWithTeam');
const registerWithThisTeam = require("./postbacks/registerWithThisTeam");
const dontRegisterTournament = require("./postbacks/dontRegisterTournament");
const dontRegisterWithThisTeam = require("./postbacks/dontRegisterWithThisTeam");
const nextTournaments = require("./postbacks/nextTournaments");

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
  else if(payload.match(/DONT_REGISTER_WITH_TEAM/) !== null){
    dontRegisterWithThisTeam(sender_psid);
  }
  else if(payload.match(/REGISTER_WITH_TEAM/) !== null){
    let payloadParts = payload.split("/");
    registerWithTeam(sender_psid, payloadParts[1]);
  }
  else if(payload.match(/REGISTER_WITH_THIS_TEAM/) !== null){
    let payloadParts = payload.split("/");
    registerWithThisTeam(sender_psid, payloadParts[1], payloadParts[2]);
  }
  else if(payload.match(/DONT_REGISTER_TOURNAMENT/) !== null){
    dontRegisterTournament(sender_psid);
  }
  else if(payload.match(/NEXT_TOURNAMENTS/) !== null){
    nextTournaments(sender_psid);
  }
  else if(payload === 'INFORMATIONS'){

  }
};
