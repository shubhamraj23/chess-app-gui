// Import all the required modules
const request = require('supertest')
const cookie = require('cookie')
const crypto = require('crypto')
const app = require('../../src/app')
const User = require('../../src/models/userModel')

// Utility function to create a new user.
const createUser = async (user) => {
  const hash = crypto.createHash('sha256')
  hash.update(user.password)
  user.password = hash.digest('hex')
  await User(user).save()
}

// Utility function to delete a new user.
const deleteUser = async (user) => {
  await User.deleteMany({ userId: user.userId })
}

// Utility function to login an existing user.
const loginUser = async (testUser) => {
  const response = await request(app).post('/user/login').send(testUser)
  return response
}

// Utility function to return a cookie value from response
const getCookieValue = (response, cookieName) => {
  const cookieHeaders = response.headers['set-cookie']
  if (!cookieHeaders) return ''
  const cookies = cookieHeaders.map(cookie.parse)
  let cookieValue = ''
  for (const parsedCookie of cookies) {
    const name = Object.keys(parsedCookie)[0]
    if (name == cookieName) cookieValue = parsedCookie[cookieName]
  }
  return cookieValue
}

module.exports = {
  createUser,
  deleteUser,
  loginUser,
  getCookieValue
}