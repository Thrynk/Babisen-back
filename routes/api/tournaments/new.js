const Tournament = require('../../../models/tournament');

module.exports = function(req, res){
  Tournament.findOne(req.body, function(err, tournament){
    if(!tournament){
      var tournament = new Tournament(req.body);
      tournament.save().then(function(){
        res.status(200).send({name: req.body.name, date: req.body.date, status: req.body.status});
      }).catch(function(err){
        console.log("Error : " + err);
        res.sendStatus(422);
      });
    }
    else{
      res.status(422).send(tournament);
    }
  });
};
