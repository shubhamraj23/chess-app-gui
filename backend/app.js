// Load all the environment variables in dev environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Import all the relevant modules.
require('./mongoose')
const express = require('express')
const userRouter = require('./routers/userRouter')

// Create an express application.
const app = express()
const PORT = 8080

app.use(express.json())
app.use('/user', userRouter)

// Run the application.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})