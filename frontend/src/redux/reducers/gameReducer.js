const initialState = {
  gameId: null,
  player: null,
  turn: false,
  kingMoved: false,
  leftRookMoved: false,
  rightRookMoved: false
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

    case 'MOVE_KING':
      return {
        ...state,
        kingMoved: true
      }

    case 'MOVE_LEFT_ROOK':
      return {
        ...state,
        leftRookMoved: true
      }
    
    case 'MOVE_RIGHT_ROOK':
      return {
        ...state,
        rightRookMoved: true
      }
    
    case 'RESET_GAME':
      return initialState

    default:
      return state
  }
}

export default gameReducer