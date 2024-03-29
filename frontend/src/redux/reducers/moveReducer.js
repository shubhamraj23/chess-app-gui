import generateMoves from '../utils/generateMoves'
import validateMove from '../utils/validateMove'

const initialState = {
  moves: Array.from({ length: 8 }, () => Array(8).fill(false)),
  click: {
    status: false,
    row: null,
    col: null,
    piece: null
  }
}

const moveReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_MOVE':
      return {
        ...state,
        moves: initialState.moves,
      }

    case 'RESET_CLICK':
      return {
        ...state,
        click: initialState.click
      }

    case 'GET_MOVES':
      const { cells, row, col, piece, enpassCell, check, castling } = action.payload
      const allMoves = generateMoves(cells, row, col, false, enpassCell, null, check, castling)
      const moves = validateMove(allMoves, cells, row, col)
      return {
        ...state,
        moves,
        click: { status: true, row, col, piece }
      }

    default:
      return state
  }
}

export default moveReducer