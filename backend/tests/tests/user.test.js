// Import all the relevant modules.
const request = require('supertest')
const app = require('../../app')
const User = require('../../models/userModel')
const { userOne } = require('../mock/mockUser')

// Create a test to signup a new valid user.
describe('Signup a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({ userId: userOne.userId })
  })

  afterEach(async () => {
    await User.deleteMany({ userId: userOne.userId })
  })

  test('Should signup a new valid user', async () => {
    // Send a valid user and expect a valid response.
    const response = await request(app).post('/user/signup').send(userOne)
    
    // Check the response
    expect(response.statusCode).toBe(201)
    expect(response.body).toMatchObject({
      message: "User successfully created."
    })
  
    // Search for the object in the database.
    const user = await User.find({ userId: userOne.userId})
    expect(user).not.toBeNull()
  
    // The password stored should not be the same.
    expect(user.password).not.toBe(userOne.password)
  })
})