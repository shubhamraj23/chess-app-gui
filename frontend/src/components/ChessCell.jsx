import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { movePiece, setClick, resetClick } from '../redux/actions/boardActions'
import { resetMove, getMoves } from '../redux/actions/moveActions'

const ChessCell = ({
    children, isDark, width, type, row, col,
    cells, clickedRow, clickedCol, clickedPiece, moves, turn, player,
    movePiece, setClick, resetClick, resetMove, getMoves
  }) => {
  
  const [cursor, setCursor] = useState('')
  
  useEffect(() => {
    if (moves[row][col]) setCursor('cursor-pointer')
    else if (type && turn) {
      if (type.startsWith(player)) setCursor('cursor-pointer')
      else setCursor('')
    }
    else setCursor('')
  }, [moves, player, type, turn])

  const generateMoves = () => {
    if (!moves[row][col] && cursor !== 'cursor-pointer') return
    if (moves[row][col]) {
      movePiece(clickedRow, clickedCol, row, col, clickedPiece)
      resetMove()
      resetClick()
      return
    }
    getMoves(cells, row, col)
    setClick(row, col, type)
  }

  return (
    <div className={`relative flex items-center justify-center ${isDark ? 'dark-cell' : 'light-cell'} ${cursor}`} 
      style={{ width: `${width}px`, height: `${width}px` }} onClick={generateMoves}>
        {children}
        {moves[row][col] && (
          <div className="w-1/4 h-1/4 bg-amber-400 rounded-full opacity-70 z-10 absolute"></div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cells: state.board.cells,
    clickedRow: state.board.clickedRow,
    clickedCol: state.board.clickedCol,
    clickedPiece: state.board.clickedPiece,
    moves: state.move.moves,
    turn: state.game.turn,
    player: state.game.player
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    movePiece: (fromRow, fromCol, toRow, toCol, piece) =>
      dispatch(movePiece(fromRow, fromCol, toRow, toCol, piece)),
    setClick: (row, col, piece) =>
      dispatch(setClick(row, col, piece)),
    resetClick: () =>
      dispatch(resetClick()),
    resetMove: () =>
      dispatch(resetMove()),
    getMoves: (cells, row, col) =>
      dispatch(getMoves(cells, row, col))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChessCell)