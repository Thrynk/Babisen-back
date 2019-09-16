const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const apiRoutes = require('./routes/api');
const webhookRoutes = require('./routes/webhook');

const mongoose = require('mongoose');
mongoose.connect("mongodb://" + process.env.BDD_USERNAME + ":" + process.env.BDD_PASSWORD + "@" + process.env.BDD_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(function(){
  console.log("connected to database");
}).catch(function(error){
  console.log("Error" + error);
});

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.use('/webhook', webhookRoutes);

app.get('/', function(req, res){
  res.status(200).send("Welcome to Bab'isen api and webhook");
});

app.listen(app.get('port'), function(){
  console.log("Server is listening");
});
