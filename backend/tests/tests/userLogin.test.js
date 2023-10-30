// Import all the relevant modules.
const request = require('supertest')
const app = require('../../src/app')
const User = require('../../src/models/userModel')
const { createUser, deleteUser } = require('../utils/userFunctions')

// Import the mock users
const {
  user1, user2, user3, 
  validUser1, validUser2, validUser3,
  missing1, missing2, missing3, missing4, missing5,
  dummy1, dummy2, dummy3,
  invalidUser1, invalidUser2, invalidUser3
} = require('../mock/mockUserLogin')

// Create tests to login a valid user.
describe('Login a valid user', () => {
  const testCases = [
    [user1, validUser1],
    [user2, validUser2],
    [user3, validUser3]
  ]

  test.each(testCases)('Login a valid user', async (signUser, testUser) => {
    // Prepare the environment before test
    // Create the dummy user
    await createUser(signUser)

    // Send a valid user and expect a valid response.
    const response = await request(app).post('/user/login').send(testUser)
    
    // Check the response
    expect(response.statusCode).toBe(200)
  
    // Check the token returned.
    const user = await User.findOne({ userId: testUser.userId })
    expect(user.tokens.length).toBeGreaterThan(0)

    // Clear the environment after test
    // Delete the user
    await deleteUser(signUser)
  })
})

// Create tests to login users with missing details.
describe('Login a user with missing details', () => {
  const testCases = [missing1, missing2, missing3, missing4, missing5]

  test.each(testCases)('Login a user with missing details', async (testUser) => {
    // Send a user with missing details.
    const response = await request(app).post('/user/login').send(testUser)
    
    // Generate the expected response.
    let missing = ''
    if (!testUser.userId || testUser.userId.trim() === "") missing = 'username'
    else if (!testUser.password || testUser.password.trim() === "") missing = 'password'
    const expectedResponse = `Please enter a ${missing}.`

    // Check the response.
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      error: expectedResponse
    })
  })
})

// Create tests to login an invalid user.
describe('Login a valid user', () => {
  const testCases = [
    [dummy1, invalidUser1],
    [dummy2, invalidUser2],
    [dummy3, invalidUser3]
  ]

  test.each(testCases)('Login an invalid user', async (signUser, testUser) => {
    // Prepare the environment before test
    // Create the dummy user
    await createUser(signUser)

    // Send a valid user and expect a valid response.
    const response = await request(app).post('/user/login').send(testUser)
    
    // Check the response
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      error: "Invalid username and/or password."
    })

    // Clear the environment after test
    // Delete the user
    await deleteUser(signUser)
  })
})