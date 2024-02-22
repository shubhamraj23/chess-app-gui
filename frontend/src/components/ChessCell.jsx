import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const ChessCell = ({
    children, isDark, width, type, row, col, handleClick,
    moves, turn, player
  }) => {
  
  const [cursor, setCursor] = useState('')
  
  // Update the cursor state depending on the parameters.
  useEffect(() => {
    if (moves[row][col]) setCursor('cursor-pointer')
    else if (type && turn) {
      if (type.startsWith(player)) setCursor('cursor-pointer')
      else setCursor('')
    }
    else setCursor('')
  }, [moves, player, type, turn])

  return (
    <div className={`relative flex items-center justify-center ${isDark ? 'dark-cell' : 'light-cell'} ${cursor}`} 
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
    player: state.game.player
  }
}

export default connect(mapStateToProps)(ChessCell)