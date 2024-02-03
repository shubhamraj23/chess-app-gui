import ChessCell from './ChessCell'

const ChessBoard = () => {
  
  const generateBoard = () => {
    const board = []
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isDark = (row + col) % 2 !== 0
        board.push(
          <ChessCell key={`${row}-${col}`} isDark={isDark}>
            
          </ChessCell>
        )
      }
    }

    return board
  }
  
  return (
    <div className="flex flex-wrap w-64">{generateBoard()}</div>
  )
}

export default ChessBoard