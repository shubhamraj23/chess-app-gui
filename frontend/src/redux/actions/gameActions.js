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

export {
  setGameId,
  setPlayer,
  setTurn
}