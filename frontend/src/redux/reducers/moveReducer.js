import generateMoves from "../utils/generateMoves"

const initialState = {
  moves: Array.from({ length: 8 }, () => Array(8).fill(false))
}

const moveReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_MOVE':
      return {
        ...state,
        moves: initialState.moves
      }

    case 'GET_MOVES':
      const { cells, row, col } = action.payload
      const moves = generateMoves(cells, row, col)
      return {
        ...state,
        moves
      }

    default:
      return state
  }
}

export default moveReducer