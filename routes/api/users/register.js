const User = require("../../../models/user");

module.exports = function(req, res){
  console.log(req.body, "register route");
  var user = new User(req.body);

  user.save().then(function(){
    console.log("saved to database");
    res.status(200).send({auth: true, first_name: req.body.first_name, last_name: req.body.last_name});
  }).catch(function(err){
    console.log("Error : " + err);
    res.sendStatus(422);
  });
};
