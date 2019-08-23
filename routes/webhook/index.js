const express = require('express');
const router = express.Router();

const handleMessage = require('./handleMessage');
const handlePostback = require('./handlePostback');

const callSendAPI = require("./callSendAPI");

const verifyToken = process.env.FB_VERIFY_TOKEN;

router.get('/', function(req, res){
    let VERIFY_TOKEN = verifyToken;

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token){
        if (mode == "subscribe" && token == VERIFY_TOKEN){
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        }
        else {
            res.sendStatus(403);
        }
    }
});

router.post('/', function(req, res){
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(async function (entry) {

            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            //Get the sender PSID
            let sender_psid = webhook_event.sender.id;

            //Send sender action mark_seen & typing_on
            let response = {
                sender_action: "mark_seen"
            };
            await callSendAPI(sender_psid, response).then(async function () {
                await callSendAPI(sender_psid, {
                    sender_action: "typing_on"
                });
            }).catch(function (err) {
                console.log("Error while sending mark seen to user");
            });

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                if (webhook_event.message.quick_reply) {
                    handlePostback(sender_psid, webhook_event.message.quick_reply);
                } else {
                    handleMessage(sender_psid, webhook_event.message);
                }
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        });
        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
});

module.exports = router;
