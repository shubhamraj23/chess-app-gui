const mongoose = require('mongoose')

// Creating the schema for Game model
const gameSchema = mongoose.Schema({
  players: {
    white: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    black: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
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
      type: mongoose.Schema.Types.ObjectId
    }
  }
})

// Creating a model from the schema.
const Game = mongoose.model('Game', gameSchema)
module.exports = Game