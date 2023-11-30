// Import all the express application instance.
const { server } = require('./app')

// Setup the port for running the app.
const PORT = process.env.PORT || 8080

// Run the application.
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})