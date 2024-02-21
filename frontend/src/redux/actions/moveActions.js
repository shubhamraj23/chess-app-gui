const resetMove = () => {
  return {
    type: 'RESET_MOVE'
  }
}

const getMoves = (cells, row, col) => {
  return {
    type: 'GET_MOVES',
    payload: { cells, row, col }
  }
}

export {
  resetMove,
  getMoves
}