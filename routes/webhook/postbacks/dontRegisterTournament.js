const callSendAPI = require("../callSendAPI");

module.exports = function(sender_psid){
    callSendAPI(sender_psid, "Peut-être une prochaine fois alors ! :)").catch(function(err){
       console.log("Error when sending message to user about don't register");
    });
};
