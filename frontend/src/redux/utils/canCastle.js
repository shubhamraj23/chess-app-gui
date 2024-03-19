const canCastle = (cells, col, castling, check, side) => {
  if (castling === null) return false
  if (castling.castled || castling.king || check) return false
  
  if (side === 'left') {
    let result = true
    for (let i = col - 1; i > 0; i--) {
      if (cells[7][i] !== null) result = false
    }
    return result && !castling.leftRook
  }

  if (side === 'right') {
    let result = true
    for (let i = col + 1; i < 7; i++) {
      if (cells[7][i] !== null) result = false
    }
    return result && !castling.rightRook
  }
}

export default canCastle