const resetMove = () => {
  return {
    type: 'RESET_MOVE'
  }
}

const getMoves = (cells, row, col, piece) => {
  return {
    type: 'GET_MOVES',
    payload: { cells, row, col, piece }
  }
}

export {
  resetMove,
  getMoves
}