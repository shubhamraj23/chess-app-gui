// Import all the relevant modules.
const request = require('supertest')
const app = require('../../src/app')
const User = require('../../src/models/userModel')
const { createUser, deleteUser, loginUser, getCookieValue } = require('../utils/userFunctions')

// Import the mock users.
const {
  user1, user2,
  user3, user4,
  user5, user6
} = require('../mock/mockMatch')

// Create tests to match a valid user.
describe('Match a valid user', () => {
  const testCases = [user1, user2]

  test.each(testCases)('Match a valid user', async (testUser) => {
    // Prepare the environment before test
    // Create the dummy user
    const id = await createUser(testUser)
    const loginResponse = await loginUser(testUser)
    const token = getCookieValue(loginResponse, 'jwt')

    // Send the request and get the response
    const response = await request(app).post('/match').set('Cookie', `jwt=${token}`)

    // Check the response.
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject({ id: id.toHexString() })

    // Check playerStatus in the database.
    const user = await User.findById(id)
    expect(user).not.toBeNull()
    expect(user.playStatus).toBe('requested')

    // Clear the environment after test
    // Delete the user
    await deleteUser(testUser)
  })
})

// Create tests to match an unauthenticated user.
describe('Match an unauthenticated user', () => {
  test('Match an unauthenticated user', async () => {
    // Send the request and get the response
    const response = await request(app).post('/match')

    // Check the response
    expect(response.statusCode).toBe(401)
    expect(response.body).toMatchObject({
      message: "Unauthorized access."
    })
  })
})

// Create tests to match a user who has already requested for a match.
describe('Match a user who has already requested for a match', () => {
  const testCases = [user3, user4]

  test.each(testCases)('Match a user who has already requested for a match', async (testUser) => {
    // Prepare the environment before test
    // Create the dummy user
    await createUser(testUser)
    const loginResponse = await loginUser(testUser)
    const token = getCookieValue(loginResponse, 'jwt')

    // Send the request and get the response
    const response = await request(app).post('/match').set('Cookie', `jwt=${token}`)

    // Check the response.
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      error: "Matching already in progress."
    })

    // Clear the environment after test
    // Delete the user
    await deleteUser(testUser)
  })
})

// Create tests to match a user playing the game.
describe('Match a user playing the game', () => {
  const testCases = [user5, user6]

  test.each(testCases)('Match a user playing the game', async (testUser) => {
    // Prepare the environment before test
    // Create the dummy user
    await createUser(testUser)
    const loginResponse = await loginUser(testUser)
    const token = getCookieValue(loginResponse, 'jwt')

    // Send the request and get the response
    const response = await request(app).post('/match').set('Cookie', `jwt=${token}`)

    // Check the response.
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({
      error: "Cannot request for a new game while in the middle of another game."
    })

    // Clear the environment after test
    // Delete the user
    await deleteUser(testUser)
  })
})