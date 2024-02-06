import { useState, useEffect } from 'react'
import ChessCell from './ChessCell'
import ChessPiece from './ChessPiece'

const ChessBoard = () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const containerWidth = document.getElementById('game-container').offsetWidth
    const screenHeight = window.innerHeight
    const lower = Math.min(containerWidth, screenHeight)
    const divWidth = lower - (lower % 8)
    setWidth(divWidth)
  }, [])

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="my-auto" style={{ width: `${width}px`, height: `${width}px` }}>
        {[...Array(8)].map((_, row) => (
          <div key={row} className="flex">
            {[...Array(8)].map((_, col) => (
              <ChessCell key={`${row}-${col}`} isDark={(row + col) % 2 !== 0} width={width/8}>
                {row === 0 && col === 0 && <ChessPiece type='black-rook' />}
                {row === 0 && col === 1 && <ChessPiece type='black-knight' />}
                {row === 0 && col === 2 && <ChessPiece type='black-bishop' />}
                {row === 0 && col === 3 && <ChessPiece type='black-queen' />}
                {row === 0 && col === 4 && <ChessPiece type='black-king' />}
                {row === 0 && col === 5 && <ChessPiece type='black-bishop' />}
                {row === 0 && col === 6 && <ChessPiece type='black-knight' />}
                {row === 0 && col === 7 && <ChessPiece type='black-rook' />}
                {row === 1 && <ChessPiece type='black-pawn' />}

                {row === 6 && <ChessPiece type='white-pawn' />}
                {row === 7 && col === 0 && <ChessPiece type='white-rook' />}
                {row === 7 && col === 1 && <ChessPiece type='white-knight' />}
                {row === 7 && col === 2 && <ChessPiece type='white-bishop' />}
                {row === 7 && col === 3 && <ChessPiece type='white-queen' />}
                {row === 7 && col === 4 && <ChessPiece type='white-king' />}
                {row === 7 && col === 5 && <ChessPiece type='white-bishop' />}
                {row === 7 && col === 6 && <ChessPiece type='white-knight' />}
                {row === 7 && col === 7 && <ChessPiece type='white-rook' />}
              </ChessCell>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChessBoard