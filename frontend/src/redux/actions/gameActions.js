const setGameId = (gameId) => {
  return {
    type: 'SET_GAMEID',
    payload: gameId
  }
}

const setPlayer = (player) => {
  const opponent = (player === 'white') ? 'black' : 'white'
  return {
    type: 'SET_PLAYER',
    payload: { player, opponent }
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

const setCastle = (castled, king, leftRook, rightRook) => {
  return {
    type: 'SET_CASTLE',
    payload: { castled, king, leftRook, rightRook }
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
  setCastle,
  resetGame
}