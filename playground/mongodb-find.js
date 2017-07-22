// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to MongoDb Server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('597296b48675713b7258573a')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  //
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  db.collection("Users").find({
    name: "Joe"
  }).count().then((count) => {
    console.log(`Users count: ${count}`);

  }, (err) => {
    console.log(err);
  });

  //db.close();
});
