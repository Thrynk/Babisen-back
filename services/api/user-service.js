const request = require("request");

module.exports = {

  registerUser: function(user_content, sender_psid){
    return new Promise(function(resolve, reject){
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
          resolve({response: res, body: request_body});
        }
        else{
          reject(err);
        }
      });
    });
  }

}
