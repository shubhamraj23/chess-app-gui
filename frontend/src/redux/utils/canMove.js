import generateMoves from './generateMoves'
import validateMove from './validateMove'

const canMove = (cells, opponent) => {
  return cells.some((row, rowIndex) => {
    return row.some((cell, colIndex) => {
      if (cell && cell.includes(opponent)) {
        const allMoves = generateMoves(cells, rowIndex, colIndex, true)
        const moves = validateMove(allMoves, cells, rowIndex, colIndex, false)
        return moves.some((row) => row.some((cell) => (cell === true)))
      }
      return false
    })
  })
}

export default canMove