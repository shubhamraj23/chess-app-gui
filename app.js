// Import all the relevant modules.
const express = require('express')

// Create an express application.
const app = express()


// Specify the port.
const PORT = 8080

// Run the application.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})