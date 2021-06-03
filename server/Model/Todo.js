const mongoose = require('mongoose')

const todo = new mongoose.Schema({
  list_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },
  title: {
    type: String
  },
  date: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

module.exports = Todo = mongoose.model('Todo', todo)