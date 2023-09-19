// Import path module
const path = require('path')

// Find which environment is currently running.
const env = process.env.NODE_ENV || 'dev'

// Load the environment variables for dev environment
if (env === 'dev') {
  const fullPath = path.join(__dirname, '../config/.env.dev')
  require('dotenv').config({ path: fullPath })
}

// Load the environment variables for test environment
if (env === 'test') {
  const fullPath = path.join(__dirname, '../config/.env.test')
  require('dotenv').config({ path: fullPath })
}