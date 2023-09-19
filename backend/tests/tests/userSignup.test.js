// Import all the relevant modules.
const request = require('supertest')
const app = require('../../src/app')
const User = require('../../src/models/userModel')
const { 
  user1, user2, user3,
  missing1, missing2, missing3, missing4, missing5, missing6
} = require('../mock/mockUserSignup')

// Create a test to signup a new valid user.
describe('Signup a new valid user', () => {
  const testCases = [user1, user2, user3]

  beforeEach(async () => {
    await User.deleteMany({ userId: user1.userId })
    await User.deleteMany({ userId: user2.userId })
    await User.deleteMany({ userId: user3.userId })
  })

  afterEach(async () => {
    await User.deleteMany({ userId: user1.userId })
    await User.deleteMany({ userId: user2.userId })
    await User.deleteMany({ userId: user3.userId })
  })

  test.each(testCases)('Should signup a new valid user', async (testUser) => {
    // Send a valid user and expect a valid response.
    const response = await request(app).post('/user/signup').send(testUser)
    
    // Check the response
    expect(response.statusCode).toBe(201)
    expect(response.body).toMatchObject({
      message: "User successfully created."
    })
  
    // Search for the object in the database.
    const user = await User.find({ userId: testUser.userId})
    expect(user).not.toBeNull()
  
    // The password stored should not be the same.
    expect(user.password).not.toBe(testUser.password)
  })
})

// Create tests to signup users with missing details.
describe('Signup a new user with missing details', () => {
  const testCases = [missing1, missing2, missing3, missing4, missing5, missing6]

  test.each(testCases)('Signup a user with missing details', async (testUser) => {
    // Send a user with missing details.
    const response = await request(app).post('/user/signup').send(testUser)
    
    // Generate the expected response.
    let missing = ''
    if (!testUser.name || testUser.name.trim() === "") missing = 'Name'
    else if (!testUser.userId || testUser.userId.trim() === "") missing = 'User ID'
    else if (!testUser.password || testUser.password.trim() === "") missing = 'Password'
    const expectedResponse = `${missing} is a mandatory field.`

    // Check the response.
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      error: expectedResponse
    })
  
    // Search for the object in the database.
    const user = await User.find({ testUser })
    expect(user).not.toBeNull()
  
  })

})