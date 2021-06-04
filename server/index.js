const express = require('express')

const app = express()
const PORT = 5001

require('./DB/Connection')()
const cors = require('cors')
const List = require('./Model/List')
const Todo = require('./Model/Todo')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));


////////////////////////////////////
//        LIST REQUESTS
///////////////////////////////////

app.get('/', async (req, res) => {
  res.status(200)
  res.send({ hello: 'world' })
})

app.get('/list/get', async (req, res) => {
  List.find({}).populate('todos').then(lists => {
    res.status(200)
    res.send(lists)
  })
})

app.post('/list/update', async (req, res) => {
  List.updateOne(
    { _id: req.body._id },
    { name: req.body.name }
  ).then(() => {
    List.find({}).populate('todos').then(lists => {
      res.status(200)
      res.send(lists)
    })
  })
})

app.post('/list/create', async (req, res) => {
  List.findOne({ name: req.body.name }).then(list => {
    if (list) {
      res.status(400)
      res.send({ msg: 'Duplicate Entry' })
      console.log('Duplicate Entry');
    }
    else {
      List.create({ name: req.body.name }).then(result => {
        List.find({}).populate('todos').then(lists => {
          res.status(200)
          res.send(lists)
        })
      })
    }
  })
})

app.post('/list/delete', async (req, res) => {
  List.deleteOne({ _id: req.body._id }).then(() => {
    List.find({}).populate('todos').then(lists => {
      res.status(200)
      res.send(lists)
    })
  })
})

////////////////////////////////////
//        TODO REQUESTS
///////////////////////////////////

app.get('/todo/get', async (req, res) => {
  Todo.find({ list_id: req.query._id }).then(todos => {
    res.status(200)
    res.send(todos)
  })
})

app.post('/todo/update', async (req, res) => {

  const { _id, title, date, completed } = req.body
  const data = {}
  if (title)
    data.title = title
  if (date)
    data.date = date
  if (completed)
    data.completed = completed

  Todo.updateOne({ _id }, data)
    .then(() => {
      List.find({}).populate('todos')
        .then(lists => {
          res.status(200)
          res.send(lists)
        })
    })
})

app.post('/todo/create', async (req, res) => {
  Todo.create(req.body).then(todo => {
    List.updateOne(
      { _id: req.body.list_id },
      { $push: { todos: todo._id } }
    ).then(() => {
      List.find({}).populate('todos').then(lists => {
        res.status(200)
        res.send(lists)
      })
    })
  })
})

app.post('/todo/delete', async (req, res) => {
  Todo.deleteOne({ _id: req.body._id }).then(() => {
    List.find({}).populate('todos')
      .then(lists => {
        res.status(200)
        res.send(lists)
      })
  })
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})