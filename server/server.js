var express = require('express');
var bodyParser = require('body-parser');

var {moongose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb')

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(err);
  });
});

// GET /todos/#Number
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todos) => {
    if(!todos){
      res.status(404).send();
    }
    res.send({todos});
  }, (e) => {
    res.status(400).send();
  });

});

app.listen(port, () => {
  console.log(`started up at port ${port}`);
});

module.exports = {app};
