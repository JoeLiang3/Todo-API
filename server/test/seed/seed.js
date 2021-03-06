const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

// Importing Data Models
const {Todo} = require('./../../models/todo.js');
const {User} = require('./../../models/user.js');


// Seed for testing

//users
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: "joeliang123@gmail.com",
  password: "userOnePassword",
  tokens: [{
    access: "auth",
    token: jwt.sign({_id: userOneId, access: "auth"}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: "Lana@gmail.com",
  password: "userTwoPassword",
  tokens: [{
    access: "auth",
    token: jwt.sign({_id: userTwoId, access: "auth"}, process.env.JWT_SECRET).toString()
  }]
}];

//todos
const todos = [{
    _id: new ObjectID(),
    text: "Game of thrones",
    _creator: userOneId
  },{
    _id: new ObjectID(),
    text: "Hello its me",
    _creator: userTwoId
  }];

  const populateTodos = (done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
    }).then(() => {
      done();
    });
  };

  const populateUsers = (done) => {
    User.remove({}).then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    }).then(() => {
      done();
    });
  };

module.exports = {todos, populateTodos, users, populateUsers};
