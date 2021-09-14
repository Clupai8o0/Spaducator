const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const colors = require("colors");

const connectionURL =
  "mongodb+srv://educator:####@educator.lcy8p.mongodb.net";
const databaseName = "database";

MongoClient.connect(connectionURL, {
  useNewUrlParser: true
}, (err, client) => {
  if (err) return console.log("Unable to connect to database".red)
  console.log("Connected successfully".green);

  const db = client.db(databaseName);
  db.collection('users').insertOne({
    name: 'Samridh',
    age: 15
  }, (err, result) => {
    if (err) return console.log("Unable to insert user".red);
    console.log("Success".green)
  })
})