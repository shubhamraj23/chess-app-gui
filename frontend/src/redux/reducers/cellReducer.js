const initialState = {
  cells: Array.from({ length: 8 }, () => Array(8).fill(null))
}

const chessboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_CHESSBOARD':
      const player = action.payload
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
        ...state,
        cells: initialChessboardState
      }

    case 'MOVE_PIECE':
      const { fromRow, fromCol, toRow, toCol, piece } = action.payload
      const updatedCells = state.cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === fromRow && colIndex === fromCol) return null
          if (rowIndex === toRow && colIndex === toCol) return piece
          return cell
        })
      )

      return {
        ...state,
        cells: updatedCells,
      }
    
    default:
      return state
  }
}

export default chessboardReducer