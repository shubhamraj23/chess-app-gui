import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getMoves } from '../redux/actions/moveActions'

const ChessCell = ({children, isDark, width, type, player, turn, row, col, cells, getMoves}) => {
  const [cursor, setCursor] = useState('')

  useEffect(() => {
    if (type && turn) {
      const prefix = (player === 0) ? 'white' : 'black'
      if (type.startsWith(prefix)) setCursor('cursor-pointer')
      else setCursor('')
    }
    else setCursor('')
  }, [player, type, turn])

  const generateMoves = () => {
    if (cursor !== 'cursor-pointer') return
    getMoves(cells, row, col)
  }

  return (
    <div className={`flex items-center justify-center ${isDark ? 'dark-cell' : 'light-cell'} ${cursor}`} 
      style={{ width: `${width}px`, height: `${width}px` }} onClick={generateMoves}>
        {children}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cells: state.chessboard.cells
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMoves: (cells, row, col) =>
      dispatch(getMoves(cells, row, col))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChessCell)