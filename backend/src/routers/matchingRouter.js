// Import all the required modules
const express = require('express')
const axios = require('axios')
axios.defaults.baseURL = process.env.BASE_URL
const authenticate = require('../middleware/authenticate')

// Create a router
const router = new express.Router()

// Route to match a player with another player.
router.post('/', authenticate, async (request, response) => {
  try {
    const player = request.user
    if (player.playStatus === 'requested') {
      return response.status(400).send({
        error: "Matching already in progress."
      })
    }

    if (player.playStatus === 'playing') {
      return response.status(400).send({
        error: "Cannot request for a new game while in the middle of another game."
      })
    }

    // Save the player status and send a response to initiate a WebSocket connection from client side.
    player.playStatus = 'requested'
    await player.save()
    
    // Make an axios request to update the token of the player.
    const res = await axios.post('user/refresh', { id: player._id, currToken: request.cookies.jwt })
    response.cookie('jwt', res.data.token, {
      expires: new Date(Date.now() + 3600*1000),
      secure: process.env.SECURE_COOKIE,
      httpOnly: true
    })

    response.status(200).send({ id: player._id })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

module.exports = router