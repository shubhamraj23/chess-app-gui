// Configure the application using config files
require('./config')

// Setup the MongoDB Connection
require('./mongoose')

// Import all the relevant modules
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/userRouter')
const matchingRouter = require('./routers/matchingRouter')

// Create an express application.
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Setup the middleware
const corsOptions = { origin: 'http://localhost:3000' }
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// Setup the routers
app.use('/user', userRouter)
app.use('/match', matchingRouter(io))

module.exports = app