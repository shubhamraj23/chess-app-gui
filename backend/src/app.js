// Configure the application using config files
require('./config')

// Setup the MongoDB Connection
require('./mongoose')

// Import all the relevant modules
const express = require('express')
const userRouter = require('./routers/userRouter')

// Create an express application.
const app = express()

// Setup the middleware
app.use(express.json())

// Setup the routers
app.use('/user', userRouter)

module.exports = app