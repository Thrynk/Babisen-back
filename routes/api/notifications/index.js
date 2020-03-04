const express = require('express');
const notifications = express.Router();

notifications.get("/", function(req,res){
    res.send("test notifications");
});

module.exports = notifications;