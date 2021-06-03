const mongoose = require('mongoose')
const URI = "mongodb+srv://ahmad:12345@assessment.nnqxb.mongodb.net/test?retryWrites=true&w=majority"

const connectDB = async () => {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('DB connected successfully!')
}

module.exports = connectDB