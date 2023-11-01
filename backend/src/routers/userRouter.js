// Import all the required modules
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const express = require('express')
const User = require('../models/userModel')
const { signupValidation, loginValidation } = require('../middleware/validation')

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ userId: decoded.userId })

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

module.exports = router