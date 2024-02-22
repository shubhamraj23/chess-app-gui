const initializeChessboard = (player) => {
  return {
    type: 'INITIALIZE_CHESSBOARD',
    payload: player
  }
}

const movePiece = (fromRow, fromCol, toRow, toCol, piece) => {
  return {
    type: 'MOVE_PIECE',
    payload: { fromRow, fromCol, toRow, toCol, piece }
  }
}

export {
  initializeChessboard,
  movePiece
}