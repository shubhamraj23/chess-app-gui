const initialState = {
  gameId: null,
  player: null,
  opponent: null,
  turn: null,
  check: false,
  oppCheck: false,
  enpassCell: null,
  enpassCellSelf: null,
  castling: {
    castled: false,
    king: false,
    leftRook: false,
    rightRook: false
  },
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
      const player = action.payload.player
      const opponent = action.payload.opponent
      return {
        ...state,
        player,
        opponent
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

    case 'SET_OPPCHECK':
      const oppCheck = action.payload
      return {
        ...state,
        oppCheck
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

    case 'SET_CASTLE':
      const castle = action.payload
      return {
        ...state,
        castling: castle
      }

    case 'RESET_GAME':
      return initialState

    default:
      return state
  }
}

export default gameReducer