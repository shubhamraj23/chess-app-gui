// Import all the relevant modules.
const request = require('supertest')
const app = require('../../src/app')
const User = require('../../src/models/userModel')
const { createUser, deleteUser, loginUser, getCookieValue } = require('../utils/userFunctions')

// Import the mock users.
const {
  user1, user2, user3
} = require('../mock/mockUserLogout')

// Create tests to logout a user.
describe('Logout a user', () => {
  const testCases = [user1, user2, user3]

  test.each(testCases)('Logout a user', async (testUser) => {
    // Prepare the environment before test
    // Create and login the user
    await createUser(testUser)
    const loginResponse = await loginUser(testUser)
    const token = getCookieValue(loginResponse, 'jwt')

    // Send a request to logout the user.
    const response = await request(app).post('/user/logout')
    
    // Check the response
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject({
      message: "Logout successful."
    })
  
    // Search for the object in the database.
    const user = await User.findOne({ userId: testUser.userId})
    expect(user).not.toBeNull()
  
    // The token should not be present in the list of users tokens.
    const present = user.tokens.includes(token)
    expect(present).toBe(false)

    // The token should not be present in the cookies.
    const updatedToken = getCookieValue(response, 'jwt')
    expect(updatedToken).toBe('')

    // Clear the environment after test
    // Delete the user
    await deleteUser(testUser)
  })
})