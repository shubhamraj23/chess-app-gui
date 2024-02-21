const initialState = {
  moves: Array.from({ length: 8 }, () => Array(8).fill(null))
}

const moveReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_MOVE':
      return {
        ...state,
        moves: initialState.moves
      }

    case 'GET_MOVES':
      return {
        ...state,
        moves: initialState.moves
      }

    default:
      return state
  }
}

export default moveReducer