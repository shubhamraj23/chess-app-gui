const initializeChessboard = (player) => {
  return {
    type: 'INITIALIZE_CHESSBOARD',
    payload: player
  }
}

const movePiece = (fromRow, fromCol, toRow, toCol, setPiece) => {
  return {
    type: 'MOVE_PIECE',
    payload: { fromRow, fromCol, toRow, toCol, setPiece }
  }
}

const setClick = (row, col, piece) => {
  return {
    type: 'SET_CLICK',
    payload: { row, col, piece }
  }
}

const resetClick = () => {
  return {
    type: 'RESET_CLICK'
  }
}

export {
  initializeChessboard,
  movePiece,
  setClick,
  resetClick
}