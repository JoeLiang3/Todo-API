const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

var id = "5976ee24b9f610040f1c3597";

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log("todos", todos)
// });
//
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log("todo", todo)
// });

Todo.findById(id).then((todo) => {
  if(!todo) {
    return console.log("id not found");
  }
  console.log("todo", todo)
}).catch((e) => {
  console.log(e);
});

// User.findById(id).then((user) => {
//   if(!user) {
//     return console.log("ID not found");
//   }
//   console.log("User", user);
// }).catch((e) => {
//   console.log(e);
// });
