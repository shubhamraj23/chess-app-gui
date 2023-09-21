// Import all the relevant modules.
const request = require('supertest')
const crypto = require('crypto')
const app = require('../../src/app')
const User = require('../../src/models/userModel')

// Import the mock users
const {
  user1, user2, user3,
  missing1, missing2, missing3, missing4, missing5, missing6,
  dummy1, dummy2, dummy3, duplicate1, duplicate2, duplicate3,
  invalidUser1, invalidUser2, invalidUser3, invalidUserOutput1, invalidUserOutput2, invalidUserOutput3,
  invalidPassword1, invalidPassword2, invalidPassword3, invalidPassword4, invalidPassword5,
  invalidPasswordOutput1, invalidPasswordOutput2, invalidPasswordOutput3, invalidPasswordOutput4, invalidPasswordOutput5
} = require('../mock/mockUserSignup')

// Create tests to signup a new valid user.
describe('Signup a new valid user', () => {
  const testCases = [user1, user2, user3]

  test.each(testCases)('Signup a new valid user', async (testUser) => {
    // Prepare the environment before test
    // Delete the user if it exists
    await deleteUser(testUser)

    // Send a valid user and expect a valid response.
    const response = await request(app).post('/user/signup').send(testUser)
    
    // Check the response
    expect(response.statusCode).toBe(201)
    expect(response.body).toMatchObject({
      message: "User successfully created."
    })
  
    // Search for the object in the database.
    const user = await User.findOne({ userId: testUser.userId})
    expect(user).not.toBeNull()
  
    // The password stored should not be the same.
    expect(user.password).not.toBe(testUser.password)

    // Clear the environment after test
    // Delete the user
    await deleteUser(testUser)
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
    else if (!testUser.userId || testUser.userId.trim() === "") missing = 'Username'
    else if (!testUser.password || testUser.password.trim() === "") missing = 'Password'
    const expectedResponse = `${missing} is a mandatory field.`

    // Check the response.
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      error: expectedResponse
    })
  })
})

// Create tests to signup users with invalid user ID.
describe('Signup a new user with invalid user ID', () => {
  const testCases = [
    [invalidUser1, invalidUserOutput1],
    [invalidUser2, invalidUserOutput2],
    [invalidUser3, invalidUserOutput3],
  ]

  test.each(testCases)('Signup a new user with invalid user ID', async (testUser, expectedError) => {
    // Send a user with missing details.
    const response = await request(app).post('/user/signup').send(testUser)
    
    // Check the response.
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      error: expectedError
    })
  })
})

// Create tests to signup users with invalid password.
describe('Signup a new user with invalid password', () => {
  const testCases = [
    [invalidPassword1, invalidPasswordOutput1],
    [invalidPassword2, invalidPasswordOutput2],
    [invalidPassword3, invalidPasswordOutput3],
    [invalidPassword4, invalidPasswordOutput4],
    [invalidPassword5, invalidPasswordOutput5],
  ]

  test.each(testCases)('Signup a new user with invalid password', async (testUser, expectedError) => {
    // Send a user with missing details.
    const response = await request(app).post('/user/signup').send(testUser)
    
    // Check the response.
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      error: expectedError
    })
  })
})

// Create tests to signup users with an existing user ID.
describe('Signup a new user with existing user ID', () => {
  const testCases = [
    [dummy1, duplicate1],
    [dummy2, duplicate2],
    [dummy3, duplicate3],
  ]

  test.each(testCases)('Signup a user with existing user ID', async (dummy, testUser) => {
    // Prepare the environment before test
    // Create the dummy user
    await createUser(dummy)

    // Send a user with missing details.
    const response = await request(app).post('/user/signup').send(testUser)

    // Check the response.
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      error: "This username is already taken. Please try a new one."
    })

    // Clear the environment after test
    // Delete the user
    await deleteUser(dummy)
  })
})

// Helper functions go here.
const createUser = async (user) => {
  const hash = crypto.createHash('sha256')
  hash.update(user.password)
  user.password = hash.digest('hex')
  await User(user).save()
}

const deleteUser = async (user) => {
  await User.deleteMany({ userId: user.userId })
}