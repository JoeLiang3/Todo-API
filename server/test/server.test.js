const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: "Game of thrones"
  },{
    _id: new ObjectID(),
    text: "Hello its me"
  },{
    _id: new ObjectID(),
    text: "Boku no Hero",
    completed: true,
    completedAt: 333
  }];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => {
    done();
  });
});

// beforeEach((done) => {
//   Todo.remove({}).then(() => {
//     return Todo.insertMany(todos);
//   }).then(() => done());
// });


describe('POST /todos', () => {
  it('should create new todo', (done) => {
    var text = "Test todo text";

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
           return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(() => done(e));
      });
  });

  it('should not create new todo with invalid body data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          done();
        }).catch(() => done(e));
      });
  });

});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(3);
      })
      .end(done);
  })
});

describe('GET /todos/:id', () => {
  it('should get todo matching id', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object IDs', (done) => {
    request(app)
      .get('/todos/12345')
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id',() => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => {
          done(e);
        });
      });

      // query database using findById toNotExist
      //
  });

  it('should return a 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID()}`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/12345')
      .expect(404)
      .end(done);
  });
});

describe('POST /todos/:id', () => {
  it('should update todo', (done) => {
    // grab id of first item
    var hexId = todos[0]._id.toHexString();
    var text = "Deku";
    var completed = true;
    // update text, set completed to true
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: "Deku",
        completed: true
      })
    // 200
    .expect(200)
    // text is changed, completed is true, completedAt is a number
    .expect((res) => {
      expect(res.body.todo.text).toBe('Deku');
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');

    })

    .end(done);
  });

  it('it should clear completedAt when todo is not completed', (done) => {
    // grab id of second item
    var hexId = todos[2]._id.toHexString();
    // update text, set completed to false
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: "Bakugo",
        completed: false
      })
      .expect(200)
    // 200
    // text is changed, completed false, completed is null .toNotExist
      .expect((res) => {
        expect(res.body.todo.text).toBe('Bakugo');
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
    .end(done);
  });
});
