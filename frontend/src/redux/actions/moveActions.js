const resetMove = () => {
  return {
    type: 'RESET_MOVE'
  }
}

const resetClick = () => {
  return {
    type: 'RESET_CLICK'
  }
}

const getMoves = (cells, row, col, piece, enpassCell, check, castling) => {
  return {
    type: 'GET_MOVES',
    payload: { cells, row, col, piece, enpassCell, check, castling }
  }
}

export {
  resetMove,
  resetClick,
  getMoves
}