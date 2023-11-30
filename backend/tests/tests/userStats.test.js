// Import all the relevant modules.
const request = require('supertest')
const { server } = require('../../src/app')
const { createUser, loginUser, getCookieValue, deleteUser } = require('../utils/userFunctions')
const { createGame, deleteGame } = require('../utils/gameFunctions')

// Import the mock users.
const {
  user1, user2, user3, user4,
  result1, result2, result3, result4
} = require('../mock/mockUserStats')

// Create tests to check game stats for a user.
describe('Check game stats for a user', () => {
  test('Check game stats for a user', async () => {
    // Prepare the environment before the test.
    // Create all the users.
    const player1 = await createUser(user1)
    const player2 = await createUser(user2)
    const player3 = await createUser(user3)
    const player4 = await createUser(user4)

    // Create all the games.
    const game1 = await createGame(player1, player2, player1)
    const game2 = await createGame(player2, player1, player1)
    const game3 = await createGame(player1, player3, player2)
    const game4 = await createGame(player1, player4, player4)
    const game5 = await createGame(player4, player2, player2)
    const game6 = await createGame(player2, player3, player3)
    const game7 = await createGame(player1, player3, player3)
    const game8 = await createGame(player2, player3, player3)

    // Login the users, send the requests and check the results.
    const loginResponse1 = await loginUser(user1)
    const token1 = getCookieValue(loginResponse1, 'jwt')
    const response1 = await request(server).get('/user/stats').set('Cookie', `jwt=${token1}`)
    expect(response1.statusCode).toBe(200)
    expect(response1.body).toMatchObject(result1)

    const loginResponse2 = await loginUser(user2)
    const token2 = getCookieValue(loginResponse2, 'jwt')
    const response2 = await request(server).get('/user/stats').set('Cookie', `jwt=${token2}`)
    expect(response2.statusCode).toBe(200)
    expect(response2.body).toMatchObject(result2)

    const loginResponse3 = await loginUser(user3)
    const token3 = getCookieValue(loginResponse3, 'jwt')
    const response3 = await request(server).get('/user/stats').set('Cookie', `jwt=${token3}`)
    expect(response3.statusCode).toBe(200)
    expect(response3.body).toMatchObject(result3)

    const loginResponse4 = await loginUser(user4)
    const token4 = getCookieValue(loginResponse4, 'jwt')
    const response4 = await request(server).get('/user/stats').set('Cookie', `jwt=${token4}`)
    expect(response4.statusCode).toBe(200)
    expect(response4.body).toMatchObject(result4)

    // Clear the environment after test
    // Delete the users
    await deleteUser(user1)
    await deleteUser(user2)
    await deleteUser(user3)
    await deleteUser(user4)

    // Delete the games
    await deleteGame(game1)
    await deleteGame(game2)
    await deleteGame(game3)
    await deleteGame(game4)
    await deleteGame(game5)
    await deleteGame(game6)
    await deleteGame(game7)
    await deleteGame(game8)
  })
})