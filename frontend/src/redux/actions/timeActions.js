const setPlayerTime = (time) => {
  return {
    type: 'SET_PLAYER_TIME',
    payload: time 
  }
}

const setOpponentTime = (time) => {
  return {
    type: 'SET_OPPONENT_TIME',
    payload: time 
  }
}

const setPlayerTimerStatus = (status) => {
  return {
    type: 'SET_PLAYER_TIMER_STATUS',
    payload: status 
  }
}

const setOpponentTimerStatus = (status) => {
  return {
    type: 'SET_OPPONENT_TIMER_STATUS',
    payload: status 
  }
}

const resetTimer = () => {
  return {
    type: 'RESET_TIMER'
  }
}

export {
  setPlayerTime,
  setOpponentTime,
  setPlayerTimerStatus,
  setOpponentTimerStatus,
  resetTimer
}