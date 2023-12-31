const mongoose = require('mongoose')

// Creating the schema for User model
const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  userId: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [{
    type: String
  }],
  playStatus: {
    type: String,
    enum: ['not-playing', 'playing', 'requested'],
    default: 'not-playing'
  }
})

// Creating a model from the schema.
const User = mongoose.model('User', userSchema)
module.exports = User