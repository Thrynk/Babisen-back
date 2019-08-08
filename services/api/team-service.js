const request = require("request");

function getUserTeams(userId){
    return new Promise(function(resolve, reject){
       request({
           uri: process.env.URL + "/api/teams/user/" + userId,
           method: "GET"
       }, function (err, res, request_body) {
           if (!err) {
               if (request_body && res.statusCode === 200) {
                   resolve(JSON.parse(request_body));
               } else {
                   resolve({});
               }
           } else {
               reject(err);
           }
       })
    });
}

module.exports = {
  getUserTeams: getUserTeams
};
