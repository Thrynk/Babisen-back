

module.exports = {
  this.getArrivingTournament = function(){
    return new Promise(resolve, reject){
      request({
        uri: process.env.URL + "/api/tournaments/arriving",
        method: "GET"
      }, function(err, res, request_body){
        if(!err){
          if(request_body){
            resolve(JSON.parse(request_body));
          }
          else{
            resolve({});
          }
        }
        else{
          reject(err);
        }
      });
    }
  }
}
