const initialState = {
  gameId: null,
  player: null,
  turn: false,
  check: false,
  result: null
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GAMEID':
      const gameId = action.payload
      return {
        ...state,
        gameId
      }

    case 'SET_PLAYER':
      const player = action.payload
      return {
        ...state,
        player
      }

    case 'SET_TURN':
      const turn = action.payload
      return {
        ...state,
        turn
      }

    case 'SET_CHECK':
      const check = action.payload
      return {
        ...state,
        check
      }

    case 'SET_RESULT':
      const result = action.payload
      return {
        ...state,
        result
      }

    case 'RESET_GAME':
      return initialState

    default:
      return state
  }
}

export default gameReducer