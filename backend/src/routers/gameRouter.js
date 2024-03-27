// Import all the required modules
const express = require('express')
const Game = require('../models/gameModel')
const User = require('../models/userModel')
const authenticate = require('../middleware/authenticate')
const gameValidation = require('../middleware/gameValidation')

// Create a router
const router = new express.Router()

// Route to fetch game player type
router.get('/playerType', authenticate, gameValidation, async (request, response) => {
  try {
    const userId = request.user._id
    const game = request.game
    const whitePlayer = await User.findById(game.players.white)
    const blackPlayer = await User.findById(game.players.black)

		if (userId.equals(game.players.white)) {
			return response.status(200).send({
				playerType: "white",
        player: { id: whitePlayer.userId, name: whitePlayer.name },
        opponent: { id: blackPlayer.userId, name: blackPlayer.name }
			})
		}

		if (userId.equals(game.players.black)) {
			return response.status(200).send({
				playerType: "black",
        player: { id: blackPlayer.userId, name: blackPlayer.name },
        opponent: { id: whitePlayer.userId, name: whitePlayer.name }
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

// Route to fetch the current state of chessboard.
router.get('/board', authenticate, gameValidation, async (request, response) => {
	try {
    const game = request.game
    let result = null
    if (game.result) {
      if (game.result.draw) result = 'draw'
      if (game.result.winner && game.result.winner.toString() === game.players.white.toString()) result = 'white'
      if (game.result.winner && game.result.winner.toString() === game.players.black.toString()) result = 'black'
    }

    return response.status(200).send({
      board: game.board,
      turn: game.turn,
      check: game.check,
      result,
      enpass: game.enpass,
      castle: game.castling
    })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }  
})

// Route to update the current state of chessboard.
router.post('/board', authenticate, gameValidation, async (request, response) => {
	try {
    const game = request.game
    const board = request.body.board
    const turn = request.body.turn
    game.board = board
    game.turn = turn
    await game.save() 

    return response.status(200).send({
      message: "Update successful"
    })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }  
})

// Route to update the player in check.
router.post('/check', authenticate, gameValidation, async (request, response) => {
	try {
    const game = request.game
    const check = request.body.check
    game.check = check
    await game.save() 

    return response.status(200).send({
      message: "Update successful"
    })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }  
})

// Route to update the castling information.
router.post('/castle', authenticate, gameValidation, async (request, response) => {
	try {
    const game = request.game
    const player = request.body.player
    const castle = request.body.castle
    game['castling'][player] = castle
    await game.save() 

    return response.status(200).send({
      message: "Update successful"
    })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }  
})

// Route to update the enpass cell.
router.post('/enpass', authenticate, gameValidation, async (request, response) => {
	try {
    const game = request.game
    const enpass = request.body.enpass
    game.enpass = enpass
    await game.save() 

    return response.status(200).send({
      message: "Update successful"
    })

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }  
})

// Router to post the game result.
router.post('/result', authenticate, gameValidation, async (request, response) => {
  try {
    const game = request.game
    const result = request.body.result
    if (result === 'draw') game.result.draw = true
    else game.result.draw = false
    if (result === 'black') game.result.winner = game.players.black
    else if (result === 'white') game.result.winner = game.players.white
    await game.save()

    const whitePlayer = await User.findById(game.players.white)
    const blackPlayer = await User.findById(game.players.black)

    if (!whitePlayer || !blackPlayer) {
      return response.status(400).send({
				message: "Invalid players."
			})
    }

    whitePlayer.playStatus = 'not-playing'
    await whitePlayer.save()
    blackPlayer.playStatus = 'not-playing'
    await blackPlayer.save()

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
})

module.exports = router