const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const token = process.env.FB_VERIFY_TOKEN;
const access = process.env.FB_ACCESS_TOKEN;

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://babybot:Q3fF<RRQm@babisencluster-35yvq.mongodb.net/babidd?retryWrites=true", {useNewUrlParser: true}).then(function){
  console.log("connected to database");
}).catch(function(error){
  console.log(error);
});

/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database");
});*/

const Tournament = mongoose.model('Tournament', { name: String, date: Date });

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  console.log("test");
  const t1 = new Tournament({name: "test", date: new Date()});
  t1.save().then(function() {
    console.log("inserted");
    res.json({status: "OK"});
  }).catch(function(error){
    res.send(error);
  });
});

app.get('/webhook', function(req, res){
  let VERIFY_TOKEN = token;

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

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {

  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      //Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);
      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
          handleMessage(sender_psid, webhook_event.message);
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

app.listen(app.get('port'), function(){
  console.log("webhook is listening");
});

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;

  if (received_message.text) {

  }
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  if(payload === 'GET_STARTED'){
    response = askTemplate('Are you a Cat or Dog Person?');
    callSendAPI(sender_psid, response);
  }
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": access},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {

        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

function askTemplate(text) {
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Cats",
                        "payload":"CAT_PICS"
                    },
                    {
                        "type":"postback",
                        "title":"Dogs",
                        "payload":"DOG_PICS"
                    }
                ]
            }
        }
    }
}
