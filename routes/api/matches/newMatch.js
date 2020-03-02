const Match = require('../../../models/match');

module.exports = function(req, res){

    console.log(req.body);

    let match = new Match(req.body);

    match.save().then(function(){
       res.status(201).send(match);
    }).catch(function(error){
        console.log(error);
        res.sendStatus(422);
    });
};
