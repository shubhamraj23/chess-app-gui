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
    required: true,
    validate: {
      validator: (array) => array.length === 8 && array.every(row => row.length === 8)
    },
  },
  turn: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value === 'white' || value === 'black'
    }
  },
  check: {
    type: String,
    validate: {
      validator: (value) => value === null || value === 'white' || value === 'black'
    }
  },
  enpass: {
    player: {
      type: String,
      validate: {
        validator: (value) => value === null || value === 'white' || value === 'black'
      }
    },
    cell: {
      row : Number,
      col : Number
    }
  },
  castling: {
    white: {
      castled: {
        type: Boolean,
        required: true
      },
      king: {
        type: Boolean,
        required: true
      },
      leftRook: {
        type: Boolean,
        required: true
      },
      rightRook: {
        type: Boolean,
        required: true
      }
    },
    black: {
      castled: {
        type: Boolean,
        required: true
      },
      king: {
        type: Boolean,
        required: true
      },
      leftRook: {
        type: Boolean,
        required: true
      },
      rightRook: {
        type: Boolean,
        required: true
      }
    }
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