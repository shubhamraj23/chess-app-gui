import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeChessboard, movePiece } from '../redux/actions/cellActions'
import ChessCell from './ChessCell'
import ChessPiece from './ChessPiece'

const ChessBoard = ({ cells, movePiece, initializeChessboard }) => {
  const [width, setWidth] = useState(0)
  const [player, setPlayer] = useState(0)
  const [turn, setTurn] = useState(false)

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

  // Set the chessboard state on player type load.
  useEffect(() => {
    initializeChessboard(player)
    if (player === 0) setTurn(true)
    else setTurn(false)
  }, [player])

  const handleCellMove = (fromRow, fromCol, toRow, toCol, piece) => {
    movePiece(fromRow, fromCol, toRow, toCol, piece)
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="my-auto" style={{ width: `${width}px`, height: `${width}px` }}>
        {cells.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <ChessCell key={`${rowIndex}-${colIndex}`} isDark={(rowIndex + colIndex + player) % 2 !== 0} width={width/8} type={cell} player={player} turn={turn}>
                { cell && <ChessPiece type={cell} />}
              </ChessCell>
            ))}
          </div>
        ))}
      </div>
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
    movePiece: (fromRow, fromCol, toRow, toCol, piece) =>
      dispatch(movePiece(fromRow, fromCol, toRow, toCol, piece)),
    initializeChessboard: (player) =>
      dispatch(initializeChessboard(player))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard)