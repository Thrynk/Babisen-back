const Tournament = require("../../../models/tournament");

module.exports = function(req, res){
    let query = Tournament.find({startDate: {$gte: new Date()} }).sort({date: 1});
    console.log(req.query);
    let offset = Number(req.query.offset);
    let limit = Number(req.query.limit);
    console.log(offset,limit);
    if(offset && typeof offset === 'number'){
        query = query.skip(offset);
    }
    if(limit && typeof limit === 'number'){
        query = query.limit(limit);
    }
    console.log(query);
    query.exec(function(err, docs){
        if(!err){
            console.log(docs);
            if(docs.length > 0){
                res.status(200).send(docs);
            }
            else{
                res.sendStatus(204);
            }
        }
        else{
            console.log(err);
            res.sendStatus(422);
        }
    });
};
