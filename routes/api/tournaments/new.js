const Tournament = require('../../../models/tournament');

module.exports = function (req, res) {
    Tournament.findOne({name: req.body.name}, function (err, tournament) {
        if (!tournament) {
            var tournament = new Tournament(req.body);
            console.log(tournament);
            tournament.save().then(function () {
                res.status(200).send(tournament);
            }).catch(function (err) {
                console.log("Error : " + err);
                res.sendStatus(422);
            });
        } else {
            res.status(422).send(tournament);
        }
    });
};
