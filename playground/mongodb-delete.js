// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to MongoDb Server');

  // deleteMany
  // db.collection('Todos').deleteMany({
  //   text: "watch movie"
  // }).then((res) => {
  //   console.log(res);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: "watch movie"}).then((res) => {
  //   console.log(res);
  // });

  // findOneandDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
  //   console.log(res);
  // });
  db.collection('Users').deleteMany({name: "Joe"}).then((res) => {
    console.log(res);
  });
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5972904a09fb072c2c5c1fe1')})
  .then((res) => {
    console.log(res);
  })

  //db.close();
});
