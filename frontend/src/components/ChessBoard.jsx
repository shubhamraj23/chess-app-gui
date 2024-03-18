import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeChessboard, movePiece } from '../redux/actions/boardActions'
import { getMoves, resetMove, resetClick } from '../redux/actions/moveActions'
import { setPlayer, setTurn, setCheck, setResult, setEnpass, resetEnpass, setSelfEnpass, resetSelfEnpass } from '../redux/actions/gameActions'
import ChessCell from './ChessCell'
import ChessPiece from './ChessPiece'
import PawnPromotion from './PawnPromotion'
import checkCheck from '../redux/utils/checkCheck'
import canMove from '../redux/utils/canMove'

const ChessBoard = ({
    socket,
    cells, moves, click, gameId, player, opponent, turn, check, enpassCell, enpassCellSelf,
    initializeChessboard, movePiece, getMoves, resetMove, resetClick, setPlayer, setTurn, setCheck, setEnpass, setResult, setSelfEnpass, resetSelfEnpass
  }) => {
  
  const [width, setWidth] = useState(0)
  const [promotionCol, setPromotionCol] = useState(null)
  const [promotedMove, setPromotedMove] = useState(null)
  
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

  // Set the chessboard state on player type load.
  useEffect(() => {
    axios.get(`/gameDetails/board?gameId=${gameId}`)
    .then((data) => {
      initializeChessboard(player, data.data.board)
      if (player === data.data.turn) setTurn(true)
      else setTurn(false)
      
      if (player === data.data.check) setCheck(true)
      else setCheck(false)
      
      if (data.data.result) {
        if (player === data.data.result) setResult(player)
        else setResult(opponent)
      }

      if (data.data.enpass) {
        if (player === 'white') {
          if (opponent === data.data.enpass.player) setEnpass(data.data.enpass.cell.row, data.data.enpass.cell.col)
          else setSelfEnpass(data.data.enpass.cell.row, data.data.enpass.cell.col)
        }
        else {
          if (opponent === data.data.enpass.player) setEnpass(7 - data.data.enpass.cell.row, 7 - data.data.enpass.cell.col)
          else setSelfEnpass(7 - data.data.enpass.cell.row, 7 - data.data.enpass.cell.col)
        }
      }
    })
    .catch((error) => {
      if (error.response.status === 401) return navigate('/')
    })
  }, [player])

  // Listen for incoming moves from the server on component load.
  useEffect(() => {
    if (socket) {
      socket.on('capture-move', (move) => {
        setTurn(true)
        if (enpassCellSelf) resetSelfEnpass()
        const cell = (move.enpassCell) ? { row: 7  - move.enpassCell.row, col: 7 - move.enpassCell.col } : null
        movePiece(7 - move.fromRow, 7 - move.fromCol, 7 - move.toRow, 7 - move.toCol, move.piece, cell, true)
      })
    }
  }, [socket])

  // Listen to incoming check from the server on component load.
  useEffect(() => {
    if (socket) {
      socket.on('capture-check', () => {
        setCheck(true)
      })
    }
  }, [socket])

  // Listen to incoming enpass from the server on component load.
  useEffect(() => {
    if (socket) {
      socket.on('capture-enpass', (cell) => {
        setEnpass(7 - cell.row, 7 - cell.col)
      })
    }
  }, [socket])

  // Listen to incoming result from the server on component load.
  useEffect(() => {
    if (socket) {
      socket.on('capture-result', (result) => {
        const value = (result === 'checkmate') ? opponent : 'draw'
        setResult(value)
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

  // Check if the opponent is in check whenever the state changes.
  useEffect(() => {
    if (socket && gameId && !turn) {
      const isCheck = checkCheck(cells, player)
      const movePossible = canMove(cells, opponent, enpassCellSelf)
      if (!movePossible) {
        const result = (isCheck) ? 'checkmate' : 'stalemate'
        socket.emit('send-result', gameId, result)
        const value = (result === 'checkmate') ? player : 'draw'
        setResult(value)
        const data = { result: value }
        axios.post(`/gameDetails/result?gameId=${gameId}`, data)
      }
      else if (isCheck) {
        socket.emit('send-check', gameId)
        const data = { check: opponent }
        axios.post(`/gameDetails/check?gameId=${gameId}`, data)
      }
    }
  }, [cells])

  // Send the enpass cell state to backend whenever it changes.
  useEffect(() => {
    if (gameId) {
      let data = { enpass: null }
      if (enpassCell) {
        data.enpass = {
          player: opponent,
          cell: {
            row: (player === 'white') ? enpassCell.row : 7 - enpassCell.row,
            col: (player === 'white') ? enpassCell.col : 7 - enpassCell.col
          }
        }
      }
      axios.post(`/gameDetails/enpass?gameId=${gameId}`, data)
    }
  }, [enpassCell])

  // Move the piece on pawn promotion.
  useEffect(() => {
    if (promotedMove === 'close') {
      setPromotionCol(null)
      setTurn(true)
      setPromotedMove(null)
    }
    else if (promotedMove) {
      const { toRow, toCol, newPiece } = promotedMove
      setPromotionCol(null)
      movePiece(click.row, click.col, toRow, toCol, click.piece, enpassCell, false, newPiece)
      const move = { fromRow: click.row, fromCol: click.col, toRow, toCol, piece: click.piece, enpassCell }
      socket.emit('game-move', gameId, move)
      setPromotedMove(null)
    }
  }, [promotedMove])

  // Show moves or move piece depending on the click type.
  const handleClick = (row, col, type) => {
    if (!moves[row][col] && !(type && turn && type.startsWith(player))) return
    
    // If it is a valid move, move the piece.
    if (moves[row][col]) {
      setTurn(false)
      if (check) {
        setCheck(false)
        const data = { check: null }
        axios.post(`/gameDetails/check?gameId=${gameId}`, data)
      }

      // Send en pass signal.
      if (click.piece.includes('pawn') && (click.row - row) === 2) {
        const cell = { row: row + 1, col: col }
        socket.emit('enpass', gameId, cell)
        setSelfEnpass(cell.row, cell.col)
      }

      // Display pawn promotion
      if (click.piece.includes('pawn') && row === 0) {
        setPromotionCol(col)
        resetMove()
        return
      }
      
      movePiece(click.row, click.col, row, col, click.piece, enpassCell, false, null)
      const move = { fromRow: click.row, fromCol: click.col, toRow: row, toCol: col, piece: click.piece, enpassCell }
      socket.emit('game-move', gameId, move)
      resetMove()
      resetClick()
      resetEnpass()
    }
    else // Else get the moves for the selected piece.
      getMoves(cells, row, col, type, enpassCell)
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
                { rowIndex === 0 && colIndex === promotionCol && 
                  <PawnPromotion width={width/8} setPromotedMove={setPromotedMove} toRow={rowIndex} toCol={colIndex}/>
                }
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
    opponent: state.game.opponent,
    turn: state.game.turn,
    check: state.game.check,
    enpassCell: state.game.enpassCell,
    enpassCellSelf: state.game.enpassCellSelf
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeChessboard: (player, currentBoard) =>
      dispatch(initializeChessboard(player, currentBoard)),
    movePiece: (fromRow, fromCol, toRow, toCol, piece, enpassCell, reverse, promotedPiece) =>
      dispatch(movePiece(fromRow, fromCol, toRow, toCol, piece, enpassCell, reverse, promotedPiece)),
    getMoves: (cells, row, col, piece, enpassCell) =>
      dispatch(getMoves(cells, row, col, piece, enpassCell)),
    resetMove: () =>
      dispatch(resetMove()),
    resetClick: () =>
      dispatch(resetClick()),
    setPlayer: (player) => 
      dispatch(setPlayer(player)),
    setTurn: (turn) =>
      dispatch(setTurn(turn)),
    setCheck: (check) =>
      dispatch(setCheck(check)),
    setEnpass: (row, col) =>
      dispatch(setEnpass(row, col)),
    resetEnpass: () =>
      dispatch(resetEnpass()),
    setSelfEnpass: (row, col) =>
      dispatch(setSelfEnpass(row, col)),
    resetSelfEnpass: () =>
      dispatch(resetSelfEnpass()),
    setResult: (result) =>
      dispatch(setResult(result))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard)