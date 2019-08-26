const callSendAPI = require("../callSendAPI");

module.exports = function(sender_psid){
  callSendAPI(sender_psid, "Pas de problème, n'hésite pas à cliquer sur Prochains tournois dans le menu si tu es interessé !").catch(function(){
     console.log("Error when sending message to the user about dont register with this team");
  });
};
