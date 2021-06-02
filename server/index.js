const express = require('express')
const { MongoClient } = require("mongodb");

const app = express()
const port = 4201


const uri = "mongodb+srv://ahmad:12345@assessment.nnqxb.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/', (req, res) => {
  client.connect(err => {
    const collection = client.db('test').collection('lists')

    collection.insertOne({
      name: 'abc'
    }).then(() => client.close())
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})