// Import all the required modules
const express = require('express')
const User = require('../models/userModel')
const Match = require('../models/matchModel')
const Game = require('../models/gameModel')
const authenticate = require('../middleware/authenticate')

// Create a router
const router = new express.Router()

const matchingRouter = (io) => {
  // Route to request for a new match.
  router.post('/', authenticate, async (request, response) => {
    try {
      const player = request.user
      if (player.playStatus === 'requested') {
        return response.status(400).send({
          error: "Matching already in progress."
        })
      }
  
      if (player.playStatus === 'playing') {
        return response.status(400).send({
          error: "Cannot request for a new game while in the middle of another game."
        })
      }

      // Save the player status and send a response to initiate a WebSocket connection from client side.
      player.playStatus = 'requested'
      await player.save()
      response.status(200).send({ id: player._id })

    } catch (error) {
      response.status(500).send({
        error: "Something unprecedented happened. Please try again."
      })
    }
  })

  // Respond to a websocket connection by the client.
  io.on('connection', (socket) => {
    // Search for a match.
    socket.on('match-request', async (data) => {
      const playerId = data.data.id
      const player1 = await User.findById(playerId)
      const matchedUser = await Match.findOne({})
      
      if (!matchedUser) {
        const oldUser = new Match({
          user: player1.userId,
          socketId: socket.id
        })
        await oldUser.save()
      }
      else {
        await Match.findByIdAndDelete(matchedUser._id)
        const player2 = await User.findOne({userId: matchedUser.user})
        player2.playStatus = 'playing'
        player1.playStatus = 'playing'
  
        await player1.save()
        await player2.save()

        const game = new Game({
          players: {
            white: player1._id,
            black: player2._id
          },
          moves: []
        })
        const createdGame = await game.save()
        io.to(matchedUser.socketId).emit('match-found', { id: createdGame._id })
        socket.emit('match-found', { id: createdGame._id })
      }
    })
  })

  return router
}

module.exports = matchingRouter