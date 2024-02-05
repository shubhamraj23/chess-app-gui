import { useState, useEffect } from 'react'
import ChessCell from './ChessCell'

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
              <ChessCell key={`${row}-${col}`} isDark={(row + col) % 2 !== 0} width={width/8} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChessBoard