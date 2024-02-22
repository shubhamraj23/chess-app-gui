import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeChessboard, movePiece } from '../redux/actions/boardActions'
import { getMoves, resetMove } from '../redux/actions/moveActions'
import { setPlayer, setTurn } from '../redux/actions/gameActions'
import ChessCell from './ChessCell'
import ChessPiece from './ChessPiece'

const ChessBoard = ({
    socket,
    cells, moves, click, player, turn,
    initializeChessboard, movePiece, getMoves, resetMove, setPlayer, setTurn
  }) => {
  
  const [width, setWidth] = useState(0)
  
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
        setPlayer(data.data.playerType)
      })
      .catch((error) => {
        if (error.response.status === 401) return navigate('/')
        return navigate('/dashboard')
      })
  }, [])

  // Set the chessboard state on player type load.
  useEffect(() => {
    initializeChessboard(player)
    if (player === 'white') setTurn(true)
    else setTurn(false)
  }, [player])

  // Show moves or move piece depending on the click type.
  const handleClick = (row, col, type) => {
    if (!moves[row][col] && !(type && turn && type.startsWith(player))) return
    if (moves[row][col]) {
      movePiece(click.row, click.col, row, col, click.piece)
      resetMove()
      setTurn(false)
      return
    }
    getMoves(cells, row, col, type)
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="my-auto" style={{ width: `${width}px`, height: `${width}px` }}>
        {cells.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <ChessCell key={`${rowIndex}-${colIndex}`} isDark={(rowIndex + colIndex) % 2 !== 0}
                width={width/8} type={cell} row={rowIndex} col={colIndex} handleClick={(row, col, type) => handleClick(row, col, type)}>
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
    cells: state.board.cells,
    moves: state.move.moves,
    click: state.move.click,
    player: state.game.player,
    turn: state.game.turn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeChessboard: (player) =>
      dispatch(initializeChessboard(player)),
    movePiece: (fromRow, fromCol, toRow, toCol, piece) =>
      dispatch(movePiece(fromRow, fromCol, toRow, toCol, piece)),
    getMoves: (cells, row, col, piece) =>
      dispatch(getMoves(cells, row, col, piece)),
    resetMove: () =>
      dispatch(resetMove()),
    setPlayer: (player) => 
      dispatch(setPlayer(player)),
    setTurn: (turn) =>
      dispatch(setTurn(turn))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard)