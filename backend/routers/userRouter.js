// Import all the required modules
const crypto = require('crypto')
const express = require('express')
const User = require('../models/userModel')

// Create a router
const router = new express.Router()

// Route to create a new user
router.post('/signup', async (request, response) => {
  try {
    const data =  request.body
    const hash = crypto.createHash('sha256')
    hash.update(data.password)
    data.password = hash.digest('hex')
    
    const user = new User(data)
    await user.save()

    response.status(201).send({
      message: "User successfully created."
    })
  } catch (error) {
    response.status(400).send({error})
  }
})

module.exports = router