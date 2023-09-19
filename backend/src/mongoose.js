// Import the relevant modules
const mongoose = require('mongoose')

// Specify the MongoDB URL
const mongoURL = process.env.MONGOURL

// Connect to the database.
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Get the connection
const connection = mongoose.connection

// Handle database connection events
connection.on('connected', () => {
  console.log(`Connected to MongoDB database.`)
})

connection.on('error', (error) => {
  console.log(`MongoDB connection error ${error}`)
})

connection.on('disconnected', () => {
  console.log(`MongoDB disconnected.`)
})