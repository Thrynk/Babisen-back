const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const token = process.env.FB_VERIFY_TOKEN;
const access = process.env.FB_ACCESS_TOKEN;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://babybot:" + process.env.BDD_PASSWORD + "@babisen-ow7v7.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  client.connect(err => {
    console.log("connected");
    const collection = client.db("babidd").collection("tournaments");
    collection.insertOne({name: "test", date: new Date()}, function(err, res){
      if(err) throw err;
      console.log("document inserted");
    });
    client.close();
  });
  res.redirect("index.html");
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

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {

}
