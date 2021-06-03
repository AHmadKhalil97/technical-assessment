const mongoose = require('mongoose')

const list = new mongoose.Schema({
  name: { type: String },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }]
})
module.exports = List = mongoose.model('List', list)