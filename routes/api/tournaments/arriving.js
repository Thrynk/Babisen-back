const Tournament = require('../../../models/tournament');

module.exports = function(req, res){
  Tournament.find({startDate: {$gte: new Date()} }).sort({date: 1}).exec(function(err, docs){
    if(!err){
      if(docs.length > 0){
        res.status(200).send(docs[0]);
      }
      else{
        res.sendStatus(204);
      }
    }
    else{
      res.sendStatus(422);
    }
  });
};
