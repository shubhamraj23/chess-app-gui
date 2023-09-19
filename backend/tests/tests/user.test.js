// Import all the relevant modules.
const request = require('supertest')
const app = require('../../app')
const User = require('../../models/userModel')
const { userOne } = require('../mock/mockUser')

// Create a test to signup a new valid user.
test('Should signup a new user', async () => {
  // Send a valid user and expect a valid response.
  const response = await request(app).post('/user/signup').send(userOne)
  
  // Check the response
  expect(response.statusCode).toBe(201)
  expect(response.body).toMatchObject({
    message: "User successfully created."
  })

})