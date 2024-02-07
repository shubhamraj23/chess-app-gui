// Import all the required modules
const express = require('express')
const Game = require('../models/gameModel')
const authenticate = require('../middleware/authenticate')

// Create a router
const router = new express.Router()

// Route to fetch game player type
router.get('/playerType', authenticate, async (request, response) => {
  try {
    const userId = request.user._id
    const gameId = request.query.gameId
    const game = await Game.findById(gameId)
    
		if (!game) {
			return response.status(400).send({
				message: "Invalid game id."
			})
    }

		if (userId.equals(game.players.white)) {
			return response.status(200).send({
				playerType: "white"
			})
		}

		if (userId.equals(game.players.black)) {
			return response.status(200).send({
				playerType: "black"
			})
		}

		return response.status(400).send({
			message: "Invalid user details."
		})

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }  
})

module.exports = router