// Import all the required modules.
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// Check if the user is authenticated or not.
const authenticate = async (request, response, next) => {
  try {
    const token = request.cookies.jwt
    if (!token) {
      return response.status(401).send({
        message: "Unauthorized access."
      })
    }

    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (error) {
      if (error.name === 'JsonWebTokenError') {
        response.clearCookie('jwt')
        return response.status(401).send({
          message: "Unauthorized access."
        })
      }
      throw new Error()
    }

    if (!decoded || !decoded.userId) {
      response.clearCookie('jwt')
      return response.status(401).send({
        message: "Unauthorized access."
      })
    }

    const user = await User.findOne({ userId: decoded.userId })
    if (!user) {
      response.clearCookie('jwt')
      return response.status(401).send({
        message: "Unauthorized access."
      })
    }

    const present = user.tokens.includes(token)
    if (!present) {
      response.clearCookie('jwt')
      return response.status(401).send({
        message: "Unauthorized access."
      })
    }

    request.user = user
    next()

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
}

module.exports = authenticate