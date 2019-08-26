const User = require("../../../models/user");

module.exports = function(req, res){
  User.findOne(req.body, function(err, user){
    if(!user){
      var user = new User(req.body);
      console.log(user);
      user.save().then(function(){
        res.status(200).send({auth: true, first_name: req.body.first_name, last_name: req.body.last_name});
      }).catch(function(err){
        console.log("Error : " + err);
        res.sendStatus(422);
      });
    }
    else{
      res.status(422).send(user);
    }
  });

};
