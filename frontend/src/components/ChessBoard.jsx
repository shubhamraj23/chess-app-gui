import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeChessboard, movePiece } from '../redux/actions/boardActions'
import { getMoves, resetMove } from '../redux/actions/moveActions'
import { setPlayer, setTurn, setCheck } from '../redux/actions/gameActions'
import ChessCell from './ChessCell'
import ChessPiece from './ChessPiece'

const ChessBoard = ({
    socket,
    cells, moves, click, gameId, player, turn,
    initializeChessboard, movePiece, getMoves, resetMove, setPlayer, setTurn, setCheck
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

  // Get the player type on gameId load.
  useEffect(() => {
    if (gameId) {
      axios.get(`/gameDetails/playerType?gameId=${gameId}`)
      .then((data) => {
        setPlayer(data.data.playerType)
      })
      .catch((error) => {
        if (error.response.status === 401) return navigate('/')
        return navigate('/dashboard')
      })
    }
  }, [gameId])

  // Listen for incoming moves from the server on component load.
  useEffect(() => {
    if (socket) {
      socket.on('capture-move', (move) => {
        setTurn(true)
        movePiece(7 - move.fromRow, 7 - move.fromCol, 7 - move.toRow, 7 - move.toCol, move.piece)
      })
    }
  }, [socket])

  // Set the chessboard state on backend whenever the state changes.
  useEffect(() => {
    if (gameId && !turn) {
      let board
      if (player === 'white') board = cells
      else board = cells.map((row, rowIndex) =>
        row.map((_, colIndex) => cells[7 - rowIndex][7 - colIndex])
      )
      const playerTurn = (player === 'white') ? 'black' : 'white'
      const data = { board, turn: playerTurn}

      axios.post(`/gameDetails/board?gameId=${gameId}`, data)
      .catch((error) => {
        if (error.response.status === 401) return navigate('/')
      })
    } 
  }, [cells])

  // Set the chessboard state on player type load.
  useEffect(() => {
    axios.get(`/gameDetails/board?gameId=${gameId}`)
    .then((data) => {
      initializeChessboard(player, data.data.board)
      if (player === data.data.turn) setTurn(true)
      else setTurn(false)
      if (player === data.data.check) setCheck(true)
      else setCheck(true)
    })
    .catch((error) => {
      if (error.response.status === 401) return navigate('/')
    })
  }, [player])

  // Show moves or move piece depending on the click type.
  const handleClick = (row, col, type) => {
    if (!moves[row][col] && !(type && turn && type.startsWith(player))) return
    
    // If it is a valid move, move the piece.
    if (moves[row][col]) {
      setTurn(false)
      movePiece(click.row, click.col, row, col, click.piece)
      resetMove()
      const move = { fromRow: click.row, fromCol: click.col, toRow: row, toCol: col, piece: click.piece }
      socket.emit('game-move', gameId, move)
    }
    else // Else get the moves for the selected piece.
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
    gameId: state.game.gameId,
    player: state.game.player,
    turn: state.game.turn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeChessboard: (player, currentBoard) =>
      dispatch(initializeChessboard(player, currentBoard)),
    movePiece: (fromRow, fromCol, toRow, toCol, piece) =>
      dispatch(movePiece(fromRow, fromCol, toRow, toCol, piece)),
    getMoves: (cells, row, col, piece) =>
      dispatch(getMoves(cells, row, col, piece)),
    resetMove: () =>
      dispatch(resetMove()),
    setPlayer: (player) => 
      dispatch(setPlayer(player)),
    setTurn: (turn) =>
      dispatch(setTurn(turn)),
    setCheck: (check) =>
      dispatch(setCheck(check))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard)