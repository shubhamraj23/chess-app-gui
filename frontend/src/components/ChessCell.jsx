import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const ChessCell = ({
    children, isDark, width, type, row, col, handleClick,
    moves, turn, player, check
  }) => {
  
  const [cursor, setCursor] = useState('')
  const [cellColour, setCellColour] = useState('')
  
  // Update the cursor state depending on the parameters.
  useEffect(() => {
    if (moves[row][col]) setCursor('cursor-pointer')
    else if (type && turn) {
      if (type.startsWith(player)) setCursor('cursor-pointer')
      else setCursor('')
    }
    else setCursor('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves, player, type, turn])

  // Update the cell colour whenever check changes.
  useEffect(() => {
    if (check && type && type.includes(player) && type.includes('king')) setCellColour('check-cell')
    else {
      if (isDark) setCellColour('dark-cell')
      else setCellColour('light-cell')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check])

  return (
    <div className={`relative flex items-center justify-center ${cellColour} ${cursor}`} 
      style={{ width: `${width}px`, height: `${width}px` }} onClick={() => handleClick(row, col, type)}>
        {children}
        {moves[row][col] && (
          <div className="w-1/4 h-1/4 bg-amber-400 rounded-full opacity-70 z-10 absolute"></div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    moves: state.move.moves,
    turn: state.game.turn,
    player: state.game.player,
    check: state.game.check
  }
}

export default connect(mapStateToProps)(ChessCell)