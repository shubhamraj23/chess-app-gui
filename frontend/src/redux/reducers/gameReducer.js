const initialState = {
  gameId: null,
  player: null,
  turn: false
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

    default:
      return state
  }
}

export default gameReducer