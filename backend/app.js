// Load all the environment variables in dev environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Import all the relevant modules.
require('./mongoose')
const express = require('express')

// Create an express application.
const app = express()
const PORT = 8080

// Run the application.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})