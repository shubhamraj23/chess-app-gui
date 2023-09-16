const mongoose = require('mongoose')

// Creating the schema for Game model
const gameSchema = mongoose.Schema({
  player1: {
    type: String,
    required: true
  },
  player2: {
    type: String,
    required: true
  },
  moves: [{
    type: String
  }],
  winner: {
    type: String
  }
})

// Creating a model from the schema.
const Game = mongoose.model('Game', gameSchema)
module.exports = Game