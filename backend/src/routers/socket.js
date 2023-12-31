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
}

module.exports = handleSocket