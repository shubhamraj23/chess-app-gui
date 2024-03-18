const initializeChessboard = (player, currentBoard) => {
  return {
    type: 'INITIALIZE_CHESSBOARD',
    payload: { player, currentBoard }
  }
}

const movePiece = (fromRow, fromCol, toRow, toCol, piece, enpassCell, reverse, promotedPiece) => {
  return {
    type: 'MOVE_PIECE',
    payload: { fromRow, fromCol, toRow, toCol, piece, enpassCell, reverse, promotedPiece }
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