const request = require('request');
const callSendAPI = require('./callSendAPI');
const gettingStartedPostback = require('./postbacks/gettingStarted');

const User = require('../../models/user');

const accessToken = process.env.FB_ACCESS_TOKEN;

// Handles messaging_postbacks events
module.exports = function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  if(payload === 'GET_STARTED'){
    gettingStartedPostback(sender_psid);
  }
  else if(payload === 'INFORMATIONS'){

  }
};
