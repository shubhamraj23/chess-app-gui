import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChessCell from './ChessCell'
import ChessPiece from './ChessPiece'

const ChessBoard = () => {
  const [width, setWidth] = useState(0)
  const [player, setPlayer] = useState(0)

  // Using the useNavigate hook to navigate
  const navigate = useNavigate()

  // Fix the width on component load.
  useEffect(() => {
    const containerWidth = document.getElementById('game-container').offsetWidth
    const screenHeight = window.innerHeight
    const lower = Math.min(containerWidth, screenHeight)
    const divWidth = lower - (lower % 8)
    setWidth(divWidth)
  }, [])

  // Get the player type on component load.
  useEffect(() => {
    const url = window.location.href
    const urlParts = url.split('/')
    const gameId = urlParts[urlParts.length - 1]
    axios.get(`/gameDetails/playerType?gameId=${gameId}`)
      .then((data) => {
        if (data.data.playerType === "black") setPlayer(7)
        else setPlayer(0)
      })
      .catch((error) => {
        if (error.response.status === 401) return navigate('/')
        return navigate('/dashboard')
      })
  }, [])

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="my-auto" style={{ width: `${width}px`, height: `${width}px` }}>
        {[...Array(8)].map((_, row) => (
          <div key={row} className="flex">
            {[...Array(8)].map((_, col) => (
              <ChessCell key={`${row}-${col}`} isDark={(row + col + player) % 2 !== 0} width={width/8}>
                { Math.abs(player - row) === 0 && col === 0 && <ChessPiece type='black-rook' />}
                { Math.abs(player - row) === 0 && col === 1 && <ChessPiece type='black-knight' />}
                { Math.abs(player - row) === 0 && col === 2 && <ChessPiece type='black-bishop' />}
                { Math.abs(player - row) === 0 && col === 3 && <ChessPiece type='black-queen' />}
                { Math.abs(player - row) === 0 && col === 4 && <ChessPiece type='black-king' />}
                { Math.abs(player - row) === 0 && col === 5 && <ChessPiece type='black-bishop' />}
                { Math.abs(player - row) === 0 && col === 6 && <ChessPiece type='black-knight' />}
                { Math.abs(player - row) === 0 && col === 7 && <ChessPiece type='black-rook' />}
                { Math.abs(player - row) === 1 && <ChessPiece type='black-pawn' />}

                { Math.abs(player - row) === 6 && <ChessPiece type='white-pawn' />}
                { Math.abs(player - row) === 7 && col === 0 && <ChessPiece type='white-rook' />}
                { Math.abs(player - row) === 7 && col === 1 && <ChessPiece type='white-knight' />}
                { Math.abs(player - row) === 7 && col === 2 && <ChessPiece type='white-bishop' />}
                { Math.abs(player - row) === 7 && col === 3 && <ChessPiece type='white-queen' />}
                { Math.abs(player - row) === 7 && col === 4 && <ChessPiece type='white-king' />}
                { Math.abs(player - row) === 7 && col === 5 && <ChessPiece type='white-bishop' />}
                { Math.abs(player - row) === 7 && col === 6 && <ChessPiece type='white-knight' />}
                { Math.abs(player - row) === 7 && col === 7 && <ChessPiece type='white-rook' />}
              </ChessCell>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChessBoard