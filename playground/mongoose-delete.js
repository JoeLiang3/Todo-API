const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');



// Todo.findOneAndRemove({})
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: "597c24a0cb63929545264289"}).then((todo) => {
  console.log(todo);
})

Todo.findOneAndRemove("597c24a0cb63929545264289").then((todo) => {
  console.log(todo);
});
