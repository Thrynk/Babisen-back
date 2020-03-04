const express = require('express');
const notifications = express.Router();

const Notification = require("../../../models/notifications");

notifications.get("/", function(req,res){
    let query = Notification.find({}).sort({date: 1});

    query.exec(function(err, docs){
        res.send(docs);
    });
});

notifications.post("/new", function(req, res){
    console.log(req.body);
    Notification.find({notification: req.body.notification}, function(err, notifs){
        console.log(!notifs);
        if(!err){
            var notif = new Notification(req.body);
            console.log(notif);
            notif.save().then(function(){
                res.sendStatus(200);
            })
            .catch(function(error){
                console.log(error);
                res.sendStatus(422);
            });
        }
        else{
            res.sendStatus(422);
        }
    });
});

module.exports = notifications;
