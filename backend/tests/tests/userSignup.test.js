// Import all the relevant modules.
const request = require('supertest')
const app = require('../../src/app')
const User = require('../../src/models/userModel')

const { 
  user1, user2, user3,
  missing1, missing2, missing3, missing4, missing5, missing6,
  dummy1, dummy2, dummy3, duplicate1, duplicate2, duplicate3,
  invalidUser1, invalidUser2, invalidUser3, invalidUserOutput1, invalidUserOutput2, invalidUserOutput3
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

  test.each(testCases)('Signup a new valid user', async (testUser) => {
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

// Create tests to signup users with an existing user ID.
describe('Signup a new user with existing user ID', () => {
  const testCases = [duplicate1, duplicate2, duplicate3]

  beforeEach(async () => {
    await User(dummy1).save()
    await User(dummy2).save()
    await User(dummy3).save()
  })

  afterEach(async () => {
    await User.deleteMany({ userId: dummy1.userId })
    await User.deleteMany({ userId: dummy2.userId })
    await User.deleteMany({ userId: dummy3.userId })
  })

  test.each(testCases)('Signup a user with existing user ID', async (testUser) => {
    // Send a user with missing details.
    const response = await request(app).post('/user/signup').send(testUser)

    // Check the response.
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      error: "This user ID is already taken. Please try a new one."
    })
  })
})