const mongoose = require('mongoose')

// Creating the schema for Match model
const matchSchema = mongoose.Schema({
  queue: [{
    type: String
  }]
})

// Creating a model from the schema.
const Match = mongoose.model('Match', matchSchema)
module.exports = Match