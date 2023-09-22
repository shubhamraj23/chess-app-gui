// Import all the required modules
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/userModel')

const createUser = async (user) => {
  const hash = crypto.createHash('sha256')
  hash.update(user.password)
  user.password = hash.digest('hex')
  await User(user).save()
}

const deleteUser = async (user) => {
  await User.deleteMany({ userId: user.userId })
}

const loginUser = async (credentials) => {
  const user = await User.findOne({ userId: credentials.userId })
  const secret = process.env.JWT_SECRET
  const payload = { userId: user.userId }
  const token = jwt.sign(payload, secret, { expiresIn: '1h' })
  user.tokens.push(token)
  await user.save()
  return token
}

module.exports = {
  createUser,
  deleteUser,
  loginUser
}