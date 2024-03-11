const resetMove = () => {
  return {
    type: 'RESET_MOVE'
  }
}

const getMoves = (cells, row, col, piece, enpassCell) => {
  return {
    type: 'GET_MOVES',
    payload: { cells, row, col, piece, enpassCell }
  }
}

export {
  resetMove,
  getMoves
}