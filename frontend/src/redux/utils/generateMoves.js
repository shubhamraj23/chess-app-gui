const generateMoves = (cells, row, col) => {
  const moves = Array.from({ length: 8 }, () => Array(8).fill(false))
  const piece = cells[row][col]
  const player = piece.substring(0, 5)
  const type = piece.substring(6)

  switch (type) {
    case 'pawn':
      return pawnMoves(cells, row, col, player, moves)

    case 'rook':
      return rookMoves(cells, row, col, player, moves)
    
    case 'knight':
      return knightMoves(cells, row, col, player, moves)

    case 'bishop':
      return bishopMoves(cells, row, col, player, moves)

    case 'queen':
      return queenMoves(cells, row, col, player, moves)

    case 'king':
      return kingMoves(cells, row, col, player, moves)
    
    default:
      return moves
  }
}

const pawnMoves = (cells, row, col, player, moves) => {
  if (row === 6 && isEmpty(cells[row - 2][col])) moves[row - 2][col] = true
  if (isEmpty(cells[row - 1][col])) moves[row - 1][col] = true
  if (col !== 0 && !isEmpty(cells[row - 1][col - 1]) && !isSame(cells[row - 1][col - 1], player)) moves[row - 1][col - 1] = true
  if (col !== 7 && !isEmpty(cells[row - 1][col + 1]) && !isSame(cells[row - 1][col + 1], player)) moves[row - 1][col + 1] = true
  return moves
}

const rookMoves = (cells, row, col, player, moves) => {

}

const knightMoves = (cells, row, col, player, moves) => {

}

const bishopMoves = (cells, row, col, player, moves) => {

}

const queenMoves = (cells, row, col, player, moves) => {

}

const kingMoves = (cells, row, col, player, moves) => {

}

const isEmpty = (cell) => cell === null
const isSame = (cell, player) => cell.startsWith(player)

export default generateMoves