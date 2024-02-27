import store from '../store'
import { selectPlayer } from '../selectors/gameSelector'

const initializeChessboard = (currentBoard) => {
  const state = store.getState()
  const player = selectPlayer(state.game)
  return {
    type: 'INITIALIZE_CHESSBOARD',
    payload: { player, currentBoard }
  }
}

const movePiece = (fromRow, fromCol, toRow, toCol, piece) => {
  return {
    type: 'MOVE_PIECE',
    payload: { fromRow, fromCol, toRow, toCol, piece }
  }
}

const resetBoard = () => {
  return {
    type: 'RESET_BOARD'
  }
}

export {
  initializeChessboard,
  movePiece,
  resetBoard
}