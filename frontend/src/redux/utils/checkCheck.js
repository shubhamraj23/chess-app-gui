import generateMoves from './generateMoves'

const checkCheck = (cells, player, reversePawn = false) => {
  const opponent = (player === 'white') ? 'black' : 'white'
  const opponentKing = `${opponent}-king`
  const { rowIndex, colIndex } = findKing(cells, opponentKing)
  const check = cells.some((row, i) => {
    return row.some((cell, j) => {
      if (cell && cell.includes(player)) {
        const moves = generateMoves(cells, i, j, reversePawn)
        return moves[rowIndex][colIndex] === true
      }
      return false
    })
  })
  return check
}

const findKing = (cells, opponentKing) => {
  let rowIndex = -1
  let colIndex = -1
  cells.forEach((row, i) => {
    const foundIndex = row.findIndex((cell) => cell === opponentKing)
    if (foundIndex !== -1) {
      rowIndex = i;
      colIndex = foundIndex
    }
  })

  return { rowIndex, colIndex }
}

export default checkCheck