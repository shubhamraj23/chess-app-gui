import generateMoves from "../utils/generateMoves"

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
        click: initialState.click
      }

    case 'GET_MOVES':
      const { cells, row, col, piece } = action.payload
      const moves = generateMoves(cells, row, col)
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