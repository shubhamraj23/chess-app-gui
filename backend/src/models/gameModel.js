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
  board: {
    type: [[String]],
    validate: {
      validator: (array) => array.length === 8 && array.every(row => row.length === 8)
    },
  },
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