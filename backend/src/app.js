// Configure the application using config files
require('./config')

// Setup the MongoDB Connection
require('./mongoose')

// Import all the relevant modules
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/userRouter')

// Create an express application.
const app = express()

// Setup the middleware
const corsOptions = { origin: 'http://localhost:3000' }
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// Setup the routers
app.use('/user', userRouter)

module.exports = app