const User = require('../models/userModel')
const Match = require('../models/matchModel')
const Game = require('../models/gameModel')

// Respond to a websocket connection by the client.
const handleSocket = async (io) => {
  io.on('connection', (socket) => {
    // Search for a match.
    socket.on('match-request', async (data) => {
      const playerId = data.data.id
      const player1 = await User.findById(playerId)
      const matchedUser = await Match.findOne({})
        
      if (!matchedUser) {
        // If there is no other request, keep the player in waiting.
        const oldUser = new Match({
          user: player1.userId,
          socketId: socket.id
        })
        await oldUser.save()

        // Set timeout to check if match has been found or not.
        setTimeout(async() => {
          const match = await Match.findById(oldUser._id)
          if (match) {
            await Match.findByIdAndDelete(match._id)
            const user = await User.findOne({userId: match.user})
            user.playStatus = 'not-playing'
            user.save()
            io.to(match.socketId).emit('match-not-found')
          }
        }, 60000)
      }
      else {
        // Delete the match request
        await Match.findByIdAndDelete(matchedUser._id)

        // Update the status of the two players and save it.
        const player2 = await User.findOne({userId: matchedUser.user})
        player2.playStatus = 'playing'
        player1.playStatus = 'playing'
        await player1.save()
        await player2.save()

        // Create a game and send the id to the client.
        const castle = {
          castled: false,
          king: false,
          leftRook: false,
          rightRook: false
        }
        const game = new Game({
          players: {
            white: player1._id,
            black: player2._id
          },
          board: Array.from({ length: 8 }, () => Array(8).fill(null)),
          turn: 'white',
          castling: {
            white: castle,
            black: castle
          }
        })
        const createdGame = await game.save()
        io.to(matchedUser.socketId).emit('match-found', { id: createdGame._id })
        socket.emit('match-found', { id: createdGame._id })
      }
    })

    // Join a room.
    socket.on('join-room', (roomId) => {
      socket.join(roomId)
    })

    // Listen to game-move message from the client.
    socket.on('game-move', (roomId, move) => {
      // Broadcast to the other player about the move.
      socket.broadcast.to(roomId).emit('capture-move', move)
    })

    // Listen to check message from the client.
    socket.on('send-check', (roomId) => {
      // Broadcast to other player about the check.
      socket.broadcast.to(roomId).emit('capture-check')
    })

    // Listen to en pass message from the client.
    socket.on('enpass', (roomId, cell) => {
      // Broadcast to the other player about the en pass move.
      socket.broadcast.to(roomId).emit('capture-enpass', cell)
    })

    // Listen to result message from the client.
    socket.on('send-result', (roomId, result) => {
      // Broadcast to the other player about the result.
      socket.broadcast.to(roomId).emit('capture-result', result)
    })

    // Listen to draw request from the client.
    socket.on('draw-request', (roomId) => {
      // Broadcast to the other player about the request.
      socket.broadcast.to(roomId).emit('capture-draw-request')
    })

    socket.on('draw-response', (roomId, status) => {
      // Broadcast to the other player about the response.
      socket.broadcast.to(roomId).emit('capture-draw-response', status)
    })
  })
}

module.exports = handleSocket