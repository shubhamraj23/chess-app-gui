const Game = require('../models/gameModel')

const gameValidation = async (request, response, next) => {
  try {
    const gameId = request.query.gameId
    const game = await Game.findById(gameId)
    if (!game) {
			return response.status(400).send({
				message: "Invalid game id."
			})
    }

    request.game = game
    next()

  } catch (error) {
    response.status(500).send({
      error: "Something unprecedented happened. Please try again."
    })
  }
}

module.exports = gameValidation