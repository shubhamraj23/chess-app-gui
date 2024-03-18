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

const getMoves = (cells, row, col, piece, enpassCell) => {
  return {
    type: 'GET_MOVES',
    payload: { cells, row, col, piece, enpassCell }
  }
}

export {
  resetMove,
  resetClick,
  getMoves
}