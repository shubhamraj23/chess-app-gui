import store from '../store'
import { selectBoard } from '../selectors/boardSelector'

const resetMove = () => {
  return {
    type: 'RESET_MOVE'
  }
}

const getMoves = (row, col, piece) => {
  const state = store.getState()
  const cells = selectBoard(state.board)
  return {
    type: 'GET_MOVES',
    payload: { cells, row, col, piece }
  }
}

export {
  resetMove,
  getMoves
}