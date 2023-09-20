// Import all the required modules
const crypto = require('crypto')
const express = require('express')
const User = require('../models/userModel')
const { signupValidation } = require('../middleware/validation')

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

module.exports = router