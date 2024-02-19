const initialState = {
  cells: Array.from({ length: 8 }, () => Array(8).fill(null))
}

const chessboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_CHESSBOARD':
      return {
        ...state,
        cells: action.payload
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