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
    move: {
      type: String,
      required: true
    },
    player: {
      type: String,
      required: true
    }
  }],
  result: {
    draw: {
      type: Boolean
    },
    winner: {
      type: String
    }
  }
})

// Creating a model from the schema.
const Game = mongoose.model('Game', gameSchema)
module.exports = Game