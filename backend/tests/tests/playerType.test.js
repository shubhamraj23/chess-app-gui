// Import all the relevant modules.
const request = require('supertest')
const { server } = require('../../src/app')
const { createUser, loginUser, getCookieValue, tamperToken, deleteUser } = require('../utils/userFunctions')
const { createGame, deleteGame } = require('../utils/gameFunctions')

// Import mock users.
const {
  user1, user2, user3, user4, user5, user6,
  user7, user8, user9, user10,
  user11, user12, user13, user14,
  user15, user16, user17, user18, user19, user20
} = require('../mock/mockPlayerType')

// Create tests to get player type for a valid user.
describe('Get player type for a valid user.', () => {
  const testCases = [
    [user1, user2],
    [user3, user4],
    [user5, user6]
  ]
  
  test.each(testCases)('Get player type for a valid user', async (user1, user2) => {
    // Prepare the environment before test
    // Create the players.
    const player1 = await createUser(user1)
    const player2 = await createUser(user2)

    // Create all the games.
    const game1 = await createGame(player1, player2)
    const game2 = await createGame(player2, player1)

    // Login the users, send the requests and check the results.
    const loginResponse1 = await loginUser(user1)
    const token1 = getCookieValue(loginResponse1, 'jwt')
    const response1 = await request(server).get(`/gameDetails/playerType?gameId=${game1}`).set('Cookie', `jwt=${token1}`)
    expect(response1.statusCode).toBe(200)
    expect(response1.body).toMatchObject({playerType: "white"})
    const response2 = await request(server).get(`/gameDetails/playerType?gameId=${game2}`).set('Cookie', `jwt=${token1}`)
    expect(response2.statusCode).toBe(200)
    expect(response2.body).toMatchObject({playerType: "black"})

    const loginResponse2 = await loginUser(user2)
    const token2 = getCookieValue(loginResponse2, 'jwt')
    const response3 = await request(server).get(`/gameDetails/playerType?gameId=${game1}`).set('Cookie', `jwt=${token2}`)
    expect(response3.statusCode).toBe(200)
    expect(response3.body).toMatchObject({playerType: "black"})
    const response4 = await request(server).get(`/gameDetails/playerType?gameId=${game2}`).set('Cookie', `jwt=${token2}`)
    expect(response4.statusCode).toBe(200)
    expect(response4.body).toMatchObject({playerType: "white"})

    // Clear the environment after test
    // Delete the users
    await deleteUser(user1)
    await deleteUser(user2)

    // Delete the games
    await deleteGame(game1)
    await deleteGame(game2)    
  })
})

// Create tests to get player type without a token.
describe('Get player type without a token.', () => {
  const testCases = [
    [user7, user8],
    [user9, user10]
  ]
  
  test.each(testCases)('Get player type without a token', async (user1, user2) => {
    // Prepare the environment before test
    // Create the players.
    const player1 = await createUser(user1)
    const player2 = await createUser(user2)

    // Create the game.
    const game = await createGame(player1, player2)
    
    // Login the users, send the requests and check the results.
    await loginUser(user1)
    const response1 = await request(server).get(`/gameDetails/playerType?gameId=${game}`)
    expect(response1.statusCode).toBe(401)
    expect(response1.body).toMatchObject({ message: "Unauthorized access." })

    // Clear the environment after test
    // Delete the users
    await deleteUser(user1)
    await deleteUser(user2)

    // Delete the game
    await deleteGame(game)
  })
})

// Create tests to get player type with invalid gameId.
describe('Get player type with invalid game id.', () => {
  const testCases = [
    [user11, user12],
    [user13, user14]
  ]
  
  test.each(testCases)('Get player type with invalid game id', async (user1, user2) => {
    // Prepare the environment before test
    // Create the players.
    const player1 = await createUser(user1)
    const player2 = await createUser(user2)

    // Create the game and tamper the id.
    const game = await createGame(player1, player2)
    const newGame = tamperToken(game.toString())
    
    // Login the users, send the requests and check the results.
    const loginResponse1 = await loginUser(user1)
    const token1 = getCookieValue(loginResponse1, 'jwt')
    const response1 = await request(server).get(`/gameDetails/playerType?gameId=${newGame}`).set('Cookie', `jwt=${token1}`)
    expect(response1.statusCode).toBe(400)
    expect(response1.body).toMatchObject({ message: "Invalid game id." })
    
    const loginResponse2 = await loginUser(user2)
    const token2 = getCookieValue(loginResponse2, 'jwt')
    const response2 = await request(server).get(`/gameDetails/playerType?gameId=${newGame}`).set('Cookie', `jwt=${token2}`)
    expect(response2.statusCode).toBe(400)
    expect(response2.body).toMatchObject({ message: "Invalid game id." })
    
    // Clear the environment after test
    // Delete the users
    await deleteUser(user1)
    await deleteUser(user2)

    // Delete the game
    await deleteGame(game)
  })
})

// Create tests to get player type with invalid userId.
describe('Get player type with invalid game id.', () => {
  const testCases = [
    [user15, user16, user17],
    [user18, user19, user20]
  ]
  
  test.each(testCases)('Get player type with invalid game id', async (user1, user2, otherUser) => {
    // Prepare the environment before test
    // Create the players.
    const player1 = await createUser(user1)
    const player2 = await createUser(user2)
    await createUser(otherUser)

    // Create the game.
    const game = await createGame(player1, player2)
    
    // Login the other user and send the requests for the game between player1 and player2.
    const loginResponse = await loginUser(otherUser)
    const token = getCookieValue(loginResponse, 'jwt')
    const response = await request(server).get(`/gameDetails/playerType?gameId=${game}`).set('Cookie', `jwt=${token}`)
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatchObject({ message: "Invalid user details." })
        
    // Clear the environment after test
    // Delete the users
    await deleteUser(user1)
    await deleteUser(user2)
    await deleteUser(otherUser)

    // Delete the game
    await deleteGame(game)
  })
})