// Import all the required modules
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const express = require('express')
const User = require('../models/userModel')
const Game = require('../models/gameModel')
const { signupValidation, loginValidation } = require('../middleware/validation')
const authenticate = require('../middleware/authenticate')

// Create a router
const router = new express.Router()

// Route to create a new user
router.post('/signup', signupValidation, async (request, response) => {
  try {
    let data = request.body
    data = {
      name: data.name,
      userId: data.userId,
      password: data.password
    }

    const hash = crypto.createHash('sha256')
    hash.update(data.password)
    data.password = hash.digest('hex')
    
    const user = new User(data)
    await user.save()

    response.status(201).send({
      message: "User successfully created."
    })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

// Route to login an existing user
router.post('/login', loginValidation, async (request, response) => {
  try {
    const user = request.user
    const secret = process.env.JWT_SECRET
    const payload = { userId: user.userId }

    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    user.tokens.push(token)
    await user.save()

    response.cookie('jwt', token, {
      expires: new Date(Date.now() + 3600*1000),
      secure: process.env.SECURE_COOKIE,
      httpOnly: true
    })

    response.status(200).send({
      message: "User successfully logged in.",
    })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

// Route to logout an existing user
router.post('/logout', async (request, response) => {
  try {
    const token = request.cookies.jwt
    if (!token) {
      return response.status(200).send({
        message: "Logout successful."
      })
    }
    
    let decoded, user;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (error) {
      if (error.name === 'JsonWebTokenError') {
        response.clearCookie('jwt')
        return response.status(200).send({
          message: "Logout successful."
        })
      }
    }

    if (decoded) user = await User.findOne({ userId: decoded.userId })
    if (user) {
      user.tokens = user.tokens.filter((savedToken) => {
        return token !== savedToken
      })
      await user.save()
    }

    response.clearCookie('jwt')
    response.status(200).send({
      message: "Logout successful."
    })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

// Route to validate a cookie
router.get('/validateCookie', authenticate, async (request, response) => {
  response.status(200).send({
    message: "Token valid."
  })
})

// Route to fetch user stats
router.get('/stats', authenticate, async (request, response) => {
  try {
    const id = request.user._id
    const name = request.user.name
    const firstPlayer = await Game.countDocuments({'players.white': id })
    const secondPlayer = await Game.countDocuments({'players.black': id })
    const games = firstPlayer + secondPlayer
    const wins = await Game.countDocuments({'result.winner': id })

    response.status(200).send({ name, games, wins })
  }
  catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

// Route to refresh a user token.
router.post('/refresh', async (request, response) => {
  try {
    const { id, currToken } = request.body
    const user = await User.findById(id)

    // Remove the old token
    user.tokens = user.tokens.filter((token) => token !== currToken)

    // Create a new token
    const secret = process.env.JWT_SECRET
    const payload = { userId: user.userId }
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    user.tokens.push(token)
    await user.save()

    response.status(200).send({token})
    
  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

module.exports = router