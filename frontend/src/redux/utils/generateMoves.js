import canCastle from './canCastle'

const generateMoves = (cells, row, col, reversePlayer = false, enpassCell = null, enpassCellSelf = null, check = true, castling = null) => {
  const moves = Array.from({ length: 8 }, () => Array(8).fill(false))
  const piece = cells[row][col]
  const player = piece.substring(0, 5)
  const type = piece.substring(6)

  switch (type) {
    case 'pawn':
      return pawnMoves(cells, row, col, player, moves, reversePlayer, enpassCell, enpassCellSelf)

    case 'rook':
      return rookMoves(cells, row, col, player, moves)
    
    case 'knight':
      return knightMoves(cells, row, col, player, moves)

    case 'bishop':
      return bishopMoves(cells, row, col, player, moves)

    case 'queen':
      return queenMoves(cells, row, col, player, moves)

    case 'king':
      return kingMoves(cells, row, col, player, moves, check, castling)
    
    default:
      return moves
  }
}

const pawnMoves = (cells, row, col, player, moves, reversePlayer, enpassCell, enpassCellSelf) => {
  if (!reversePlayer) {
    if (row === 6 && isEmpty(cells[row - 2][col])) moves[row - 2][col] = true
    if (isEmpty(cells[row - 1][col])) moves[row - 1][col] = true
    if (col !== 0 && !isEmpty(cells[row - 1][col - 1]) && !isSame(cells[row - 1][col - 1], player)) moves[row - 1][col - 1] = true
    if (col !== 7 && !isEmpty(cells[row - 1][col + 1]) && !isSame(cells[row - 1][col + 1], player)) moves[row - 1][col + 1] = true
    if (enpassCell) {
      if (col !== 0 && enpassCell.row === row - 1 && enpassCell.col === col - 1) moves[row - 1][col - 1] = true
      if (col !== 7 && enpassCell.row === row - 1 && enpassCell.col === col + 1) moves[row - 1][col + 1] = true
    }
  }
  else {
    if (row === 1 && isEmpty(cells[row + 2][col])) moves[row + 2][col] = true
    if (isEmpty(cells[row + 1][col])) moves[row + 1][col] = true
    if (col !== 0 && !isEmpty(cells[row + 1][col - 1]) && !isSame(cells[row + 1][col - 1], player)) moves[row + 1][col - 1] = true
    if (col !== 7 && !isEmpty(cells[row + 1][col + 1]) && !isSame(cells[row + 1][col + 1], player)) moves[row + 1][col + 1] = true
    if (enpassCellSelf) {
      if (col !== 0 && enpassCellSelf.row === row - 1 && enpassCellSelf.col === col - 1) moves[row + 1][col - 1] = true
      if (col !== 7 && enpassCellSelf.row === row - 1 && enpassCellSelf.col === col + 1) moves[row + 1][col + 1] = true
    }
  }
  return moves
}

const rookMoves = (cells, row, col, player, moves) => {
  const positions = [[1, 0], [0, 1], [0, -1], [-1, 0]]
  positions.forEach(([r, c]) => {
    let i = row + r
    let j = col + c
    while (i >= 0 && j >= 0 && i < 8 && j < 8) {
      if (!isEmpty(cells[i][j])) {
        if (!isSame(cells[i][j], player)) moves[i][j] = true
        break;
      }
      moves[i][j] = true
      i = i + r
      j = j + c
    }
  })
  return moves
}

const knightMoves = (cells, row, col, player, moves) => {
  const positions = [[1, 2], [1, -2], [2, 1], [2, -1], [-1, 2], [-1, -2], [-2, 1], [-2, -1]]
  positions.forEach(([r, c]) => {
    const i = row + r
    const j = col + c
    if (i >= 0 && j >= 0 && i < 8 && j < 8) {
      if (isEmpty(cells[i][j]) || !isSame(cells[i][j], player)) moves[i][j] = true
    }
  })
  return moves
}

const bishopMoves = (cells, row, col, player, moves) => {
  const positions = [[1, 1], [1, -1], [-1, -1], [-1, 1]]
  positions.forEach(([r, c]) => {
    let i = row + r
    let j = col + c
    while (i >= 0 && j >= 0 && i < 8 && j < 8) {
      if (!isEmpty(cells[i][j])) {
        if (!isSame(cells[i][j], player)) moves[i][j] = true
        break;
      }
      moves[i][j] = true
      i = i + r
      j = j + c
    }
  })
  return moves
}

const queenMoves = (cells, row, col, player, moves) => {
  const positions = [[1, 0], [0, 1], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, -1], [-1, 1]]
  positions.forEach(([r, c]) => {
    let i = row + r
    let j = col + c
    while (i >= 0 && j >= 0 && i < 8 && j < 8) {
      if (!isEmpty(cells[i][j])) {
        if (!isSame(cells[i][j], player)) moves[i][j] = true
        break;
      }
      moves[i][j] = true
      i = i + r
      j = j + c
    }
  })
  return moves
}

const kingMoves = (cells, row, col, player, moves, check, castling) => {
  const positions = [[1, 0], [0, 1], [-1, 0], [0, -1], [-1, 1], [1, -1], [1, 1], [-1, -1]]
  positions.forEach(([r, c]) => {
    const i = row + r
    const j = col + c
    if (i >= 0 && j >= 0 && i < 8 && j < 8) {
      if (isEmpty(cells[i][j]) || !isSame(cells[i][j], player)) moves[i][j] = true
    }
  })
  if (canCastle(cells, col, castling, check, 'left')) moves[row][col-2] = true
  if (canCastle(cells, col, castling, check, 'right')) moves[row][col+2] = true
  return moves
}

const isEmpty = (cell) => cell === null
const isSame = (cell, player) => cell.startsWith(player)

export default generateMoves