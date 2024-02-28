import checkCheck from './checkCheck'

const validateMove = (moves, cells, fromRow, fromCol) => {
  moves.forEach((row, rowIndex) => {
    row.forEach((move, colIndex) => {
      if (!move) return
      const copiedCells = cells.map((row) => [...row])
      const player = copiedCells[fromRow][fromCol].substring(0, 5)
      const opponent = (player === 'white') ? 'black' : 'white'
      copiedCells[rowIndex][colIndex] = copiedCells[fromRow][fromCol]
      copiedCells[fromRow][fromCol] = null
      if (checkCheck(copiedCells, opponent, true)) moves[rowIndex][colIndex] = false
    })
  })

  return moves
}

export default validateMove