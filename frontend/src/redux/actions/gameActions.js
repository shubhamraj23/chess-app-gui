const setGameId = (gameId) => {
  return {
    type: 'SET_GAMEID',
    payload: gameId
  }
}

const setPlayer = (player) => {
  return {
    type: 'SET_PLAYER',
    payload: player
  }
}

const setTurn = (turn) => {
  return {
    type: 'SET_TURN',
    payload: turn
  }
}

const moveKing = () => {
  return {
    type: 'MOVE_KING'
  }
}

const moveLeftRook = () => {
  return {
    type: 'MOVE_LEFT_ROOK'
  }
}

const moveRightRook = () => {
  return {
    type: 'MOVE_RIGHT_ROOK'
  }
}

const resetGame = () => {
  return {
    type: 'RESET_GAME'
  }
}

export {
  setGameId,
  setPlayer,
  setTurn,
  moveKing,
  moveLeftRook,
  moveRightRook,
  resetGame
}