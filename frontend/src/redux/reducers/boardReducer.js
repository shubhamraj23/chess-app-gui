const initialState = {
  cells: Array.from({ length: 8 }, () => Array(8).fill(null))
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_CHESSBOARD':
      const { player, currentBoard } = action.payload
      const initial = currentBoard.every((row) => row.every((value) => value === null))
      let initialChessboardState
      if (initial) {
        const playerRow = (player === 'white') ? 0 : 7
        initialChessboardState = [...Array(8)].map((_, row) =>
          [...Array(8)].map((_, col) => {
            if ( Math.abs(playerRow - row) === 0 && col === 0 ) return 'black-rook'
            if ( Math.abs(playerRow - row) === 0 && col === 1 ) return 'black-knight'
            if ( Math.abs(playerRow - row) === 0 && col === 2 ) return 'black-bishop'
            if ( Math.abs(playerRow - row) === 0 && col === 3 ) return (playerRow === 0) ? 'black-queen' : 'black-king'
            if ( Math.abs(playerRow - row) === 0 && col === 4 ) return (playerRow === 0) ? 'black-king' : 'black-queen'
            if ( Math.abs(playerRow - row) === 0 && col === 5 ) return 'black-bishop'
            if ( Math.abs(playerRow - row) === 0 && col === 6 ) return 'black-knight'
            if ( Math.abs(playerRow - row) === 0 && col === 7 ) return 'black-rook'
            if ( Math.abs(playerRow - row) === 1 ) return 'black-pawn'

            if ( Math.abs(playerRow - row) === 6 ) return 'white-pawn'
            if ( Math.abs(playerRow - row) === 7 && col === 0 ) return 'white-rook'
            if ( Math.abs(playerRow - row) === 7 && col === 1 ) return 'white-knight'
            if ( Math.abs(playerRow - row) === 7 && col === 2 ) return 'white-bishop'
            if ( Math.abs(playerRow - row) === 7 && col === 3 ) return (playerRow === 0) ? 'white-queen' : 'white-king'
            if ( Math.abs(playerRow - row) === 7 && col === 4 ) return (playerRow === 0) ? 'white-king' : 'white-queen'
            if ( Math.abs(playerRow - row) === 7 && col === 5 ) return 'white-bishop'
            if ( Math.abs(playerRow - row) === 7 && col === 6 ) return 'white-knight'
            if ( Math.abs(playerRow - row) === 7 && col === 7 ) return 'white-rook'

            return null
          })
        )
      }
      else {
        if (player === 'white') initialChessboardState = currentBoard
        else initialChessboardState = currentBoard.map((row, rowIndex) =>
          row.map((_, colIndex) => currentBoard[7 - rowIndex][7 - colIndex])
        )
      }

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

    case 'RESET_BOARD':
      return initialState
    
    default:
      return state
  }
}

export default boardReducer