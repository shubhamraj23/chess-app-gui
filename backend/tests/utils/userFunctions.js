// Import all the required modules
const request = require('supertest')
const cookie = require('cookie')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const app = require('../../src/app')
const User = require('../../src/models/userModel')

// Utility function to create a new user.
const createUser = async (user) => {
  const copyUser = {...user}
  const hash = crypto.createHash('sha256')
  hash.update(copyUser.password)
  copyUser.password = hash.digest('hex')
  await User(copyUser).save()
}

// Utility function to delete a new user.
const deleteUser = async (user) => {
  await User.deleteMany({ userId: user.userId })
}

// Utility function to login an existing user.
const loginUser = async (testUser) => {
  const response = await request(app).post('/user/login').send({
    userId: testUser.userId,
    password: testUser.password
  })
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

// Utility function to tamper a token.
const tamperToken = (token) => {
  const index = 0
  let newIndex = 1
  while (token[index] === token[newIndex]) {
    newIndex += 1
  }
  const tamperedToken = token.replace(token[index], token[newIndex])
  return tamperedToken
}

const removeToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user = await User.findOne({ userId: decoded.userId })
  user.tokens = user.tokens.filter((savedToken) => {
    return token !== savedToken
  })
  await user.save()
}

module.exports = {
  createUser,
  deleteUser,
  loginUser,
  getCookieValue,
  tamperToken,
  removeToken
}