const initialState = {
  gameId: null,
  player: null,
  turn: false,
  check: false,
  enpassCell: null,
  enpassCellSelf: null,
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

    case 'SET_ENPASS':
      const cell = action.payload
      return {
        ...state,
        enpassCell: cell
      }

    case 'RESET_ENPASS':
      return {
        ...state,
        enpassCell: null
      }

    case 'SET_SELF_ENPASS':
      const selfCell = action.payload
      return {
        ...state,
        enpassCellSelf: selfCell
      }

    case 'RESET_SELF_ENPASS':
      return {
        ...state,
        enpassCellSelf: null
      }

    case 'RESET_GAME':
      return initialState

    default:
      return state
  }
}

export default gameReducer