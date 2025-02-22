const accessToken = process.env.FB_ACCESS_TOKEN;

const request = require("request");

module.exports = {

  getUserProfile: function(sender_psid){
    return new Promise(function(resolve, reject){
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
          resolve(JSON.parse(body));
        }
        else{
          reject(err);
        }
      });
    });
  }

}
