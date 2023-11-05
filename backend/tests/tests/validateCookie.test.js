// Import all relevant modules
const request = require('supertest')
const app = require('../../src/app')
const { createUser, loginUser, deleteUser, getCookieValue, tamperToken, removeToken } = require('../utils/userFunctions')

// Import the mock users
const {
  user1, user2, user3,
  user4, user5, user6,
  user7, user8, user9
} = require('../mock/mockValidateCookie')

// Create tests to check for a valid cookie
describe('Check for a valid cookie', () => {
  const testCases = [user1, user2, user3]

  test.each(testCases)('Check for a valid cookie', async (testUser) => {
    // Prepare the environment before test
    // Create and login the user
    await createUser(testUser)
    const loginResponse = await loginUser(testUser)
    const token = getCookieValue(loginResponse, 'jwt')

    // Send a request to validate the cookie.
    const response = await request(app).get('/user/validateCookie').set('Cookie', `jwt=${token}`)

    // Check the response
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject({
      message: "Token valid."
    })

    // Clear the environment after test
    // Delete the user
    await deleteUser(testUser)
  })
})

// Create tests to check response without a cookie
describe('Check response without cookie', () => {
  test('Check for a valid cookie', async () => {
    //Send a request without the cookie.
    const response = await request(app).get('/user/validateCookie')

    // Check the response
    expect(response.statusCode).toBe(401)
    expect(response.body).toMatchObject({
      message: "Unauthorized access."
    })
  })
})

// Create tests to check response with an invalid cookie
describe('Check for an invalid cookie', () => {
  const testCases = [user4, user5, user6]

  test.each(testCases)('Check for an invalid cookie', async (testUser) => {
    // Prepare the environment before test
    // Create and login the user
    await createUser(testUser)
    const loginResponse = await loginUser(testUser)
    const token = getCookieValue(loginResponse, 'jwt')
    const tamperedToken = tamperToken(token)

    // Send a request to validate the cookie.
    const response = await request(app).get('/user/validateCookie').set('Cookie', `jwt=${tamperedToken}`)

    // Check the response
    expect(response.statusCode).toBe(401)
    expect(response.body).toMatchObject({
      message: "Unauthorized access."
    })

    // Clear the environment after test
    // Delete the user
    await deleteUser(testUser)
  })
})

// Create tests for a valid token not present on server.
describe('Check for a valid cookie not present on server', () => {
  const testCases = [user7, user8, user9]

  test.each(testCases)('Check for a valid cookie not present on server', async (testUser) => {
    // Prepare the environment before test
    // Create and login the user
    await createUser(testUser)
    const loginResponse = await loginUser(testUser)
    const token = getCookieValue(loginResponse, 'jwt')
    await removeToken(token)

    // Send a request to validate the cookie.
    const response = await request(app).get('/user/validateCookie').set('Cookie', `jwt=${token}`)

    // Check the response
    expect(response.statusCode).toBe(401)
    expect(response.body).toMatchObject({
      message: "Unauthorized access."
    })

    // Clear the environment after test
    // Delete the user
    await deleteUser(testUser)
  })
})