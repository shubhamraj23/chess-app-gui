// Import all the required modules
const crypto = require('crypto')
const express = require('express')
const User = require('../models/userModel')

// Create a router
const router = new express.Router()

// Route to create a new user
router.post('/signup', async (request, response) => {
  try {
    let data =  request.body

    // Data Validation
    if (!data.name || data.name.trim() === "") {
      return response.status(400).send({
        error: "Name is a mandatory field."
      })
    }

    if (!data.userId || data.userId.trim() === "") {
      return response.status(400).send({
        error: "User ID is a mandatory field."
      })
    }

    if (!data.password || data.password.trim() === "") {
      return response.status(400).send({
        error: "Password is a mandatory field."
      })
    }

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