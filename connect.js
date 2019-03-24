
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://babybot:Q3fF<RRQm@babisencluster-35yvq.mongodb.net/babidd?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(function(err) {
  if(err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
  }
  console.log('Connected...');
  const collection = client.db("babidd").collection("tournaments");
  collection.insertOne({name: "test", date: new Date()}, function(err, res){
    if(err) throw err;
    console.log("document inserted");
  });
  client.close();
});
