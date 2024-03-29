const initialState = {
  playerTime: 600000,
  playerTimerRunning: false,
  opponentTime: 600000,
  opponentTimerRunning: false
}

const timeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYER_TIME':
      const playerTime = action.payload
      return {
        ...state,
        playerTime
      }

    case 'SET_OPPONENT_TIME':
      const opponentTime = action.payload
      return {
        ...state,
        opponentTime
      }

    case 'SET_PLAYER_TIMER_STATUS':
      const playerTimerRunning = action.payload
      return {
        ...state,
        playerTimerRunning
      }

    case 'SET_OPPONENT_TIMER_STATUS':
      const opponentTimerRunning = action.payload
      return {
        ...state,
        opponentTimerRunning
      }

    case 'RESET_TIMER':
      return initialState

    default:
      return state
  }
}

export default timeReducer