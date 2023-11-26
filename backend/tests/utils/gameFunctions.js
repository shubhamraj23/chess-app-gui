// Import all the required modules
const Game = require('../../src/models/gameModel')

// Utility function to create a new game.
const createGame = async (player1, player2, winner) => {
  const game = new Game({
    players: {
      white: player1,
      black: player2
    },
    moves: [],
    result: { winner }
  })
  await game.save()
  return game._id
}

// Utility function to delete a game.
const deleteGame = async (id) => {
  await Game.findByIdAndDelete(id)
}

module.exports = {
  createGame,
  deleteGame
}