const Tournament = require('../../../models/tournament');

module.exports = function(req, res){
  Tournament.find({}).sort({date: 1}).exec(function(err, docs){
    if(!err){
      res.status(200).send(docs[0]);
    }
    else{
      res.sendStatus(422);
    }
  });
};
