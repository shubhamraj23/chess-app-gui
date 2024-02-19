const initializeChessboard = (player) => {
  const initialChessboardState = [...Array(8)].map((_, row) =>
      [...Array(8)].map((_, col) => {
          if ( Math.abs(player - row) === 0 && col === 0 ) return 'black-rook'
          if ( Math.abs(player - row) === 0 && col === 1 ) return 'black-knight'
          if ( Math.abs(player - row) === 0 && col === 2 ) return 'black-bishop'
          if ( Math.abs(player - row) === 0 && col === 3 ) return 'black-queen'
          if ( Math.abs(player - row) === 0 && col === 4 ) return 'black-king'
          if ( Math.abs(player - row) === 0 && col === 5 ) return 'black-bishop'
          if ( Math.abs(player - row) === 0 && col === 6 ) return 'black-knight'
          if ( Math.abs(player - row) === 0 && col === 7 ) return 'black-rook'
          if ( Math.abs(player - row) === 1 ) return 'black-pawn'

          if ( Math.abs(player - row) === 6 ) return 'white-pawn'
          if ( Math.abs(player - row) === 7 && col === 0 ) return 'white-rook'
          if ( Math.abs(player - row) === 7 && col === 1 ) return 'white-knight'
          if ( Math.abs(player - row) === 7 && col === 2 ) return 'white-bishop'
          if ( Math.abs(player - row) === 7 && col === 3 ) return 'white-queen'
          if ( Math.abs(player - row) === 7 && col === 4 ) return 'white-king'
          if ( Math.abs(player - row) === 7 && col === 5 ) return 'white-bishop'
          if ( Math.abs(player - row) === 7 && col === 6 ) return 'white-knight'
          if ( Math.abs(player - row) === 7 && col === 7 ) return 'white-rook'

          return null
      })
  )

  return {
    type: 'INITIALIZE_CHESSBOARD',
    payload: initialChessboardState
  }
}

const movePiece = (fromRow, fromCol, toRow, toCol, piece) => {
  return {
    type: 'MOVE_PIECE',
    payload: { fromRow, fromCol, toRow, toCol, piece }
  }
}

module.exports = {
  initializeChessboard,
  movePiece
}