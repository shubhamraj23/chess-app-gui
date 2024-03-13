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

const setCheck = (check) => {
  return {
    type: 'SET_CHECK',
    payload: check
  }
}

const setResult = (result) => {
  return {
    type: 'SET_RESULT',
    payload: result
  }
}

const setEnpass = (row, col) => {
  return {
    type: 'SET_ENPASS',
    payload: { row, col }
  }
}

const resetEnpass = () => {
  return {
    type: 'RESET_ENPASS'
  }
}

const setSelfEnpass = (row, col) => {
  return {
    type: 'SET_SELF_ENPASS',
    payload: { row, col }
  }
}

const resetSelfEnpass = () => {
  return {
    type: 'RESET_SELF_ENPASS'
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
  setCheck,
  setResult,
  setEnpass,
  resetEnpass,
  setSelfEnpass,
  resetSelfEnpass,
  resetGame
}