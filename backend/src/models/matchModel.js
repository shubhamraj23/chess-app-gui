const mongoose = require('mongoose')

// Creating the schema for Match model
const matchSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  socketId: { 
    type: String, 
    required: true
  }
})

// Creating a model from the schema.
const Match = mongoose.model('Match', matchSchema)
module.exports = Match