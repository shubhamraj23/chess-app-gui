import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeChessboard, movePiece } from '../redux/actions/boardActions'
import { getMoves, resetMove, resetClick } from '../redux/actions/moveActions'
import { setPlayer, setTurn, setCheck, setOppCheck, setResult, setEnpass, resetEnpass, setSelfEnpass, resetSelfEnpass, setCastle } from '../redux/actions/gameActions'
import ChessCell from './ChessCell'
import ChessPiece from './ChessPiece'
import PawnPromotion from './PawnPromotion'
import checkCheck from '../redux/utils/checkCheck'
import canMove from '../redux/utils/canMove'

const ChessBoard = ({
    socket, width,
    cells, moves, click, gameId, player, opponent, turn, check, enpassCell, enpassCellSelf, castling,
    initializeChessboard, movePiece, getMoves, resetMove, resetClick, setPlayer, setTurn, setCheck, setOppCheck, setEnpass, setResult, setSelfEnpass, resetSelfEnpass, setCastle
  }) => {
  
  const [promotionCol, setPromotionCol] = useState(null)
  const [promotedMove, setPromotedMove] = useState(null)
  
  // Using the useNavigate hook to navigate
  const navigate = useNavigate()

  // Get the player type on gameId load.
  useEffect(() => {
    if (gameId) {
      axios.get(`/gameDetails/playerType?gameId=${gameId}`)
      .then((data) => {
        setPlayer(data.data.playerType)
      })
      .catch((error) => {
        if (error.response.status === 401) return navigate('/')
        if (error.response.status === 400) return navigate('/dashboard')
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      if (opponent === data.data.check) setOppCheck(true)
      else setOppCheck(false)
      
      if (data.data.result) {
        if (data.data.result === 'draw') setResult('draw')
        else if (player === data.data.result) setResult(player)
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
      
      const { castled, king, leftRook, rightRook } = data.data.castle[player]
      setCastle(castled, king, leftRook, rightRook)
    })
    .catch((error) => {
      if (error.response.status === 401) return navigate('/')
      if (error.response.status === 400) return navigate('/dashboard')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player])

  // Listen for incoming moves from the server on component load.
  useEffect(() => {
    if (socket) {
      socket.on('capture-move', (move) => {
        setTurn(true)
        setOppCheck(false)
        if (enpassCellSelf) resetSelfEnpass()
        const cell = (move.enpassCell) ? { row: 7  - move.enpassCell.row, col: 7 - move.enpassCell.col } : null
        if (move.piece.includes('king') && Math.abs(move.fromCol - move.toCol) === 2) {
          movePiece(7 - move.fromRow, 7 - move.fromCol, 7 - move.toRow, 7 - move.toCol, move.piece, cell, true, move.newPiece, true)
        }
        else
          movePiece(7 - move.fromRow, 7 - move.fromCol, 7 - move.toRow, 7 - move.toCol, move.piece, cell, true, move.newPiece)
      })

      socket.on('capture-check', () => {
        setCheck(true)
      })

      socket.on('capture-enpass', (cell) => {
        setEnpass(7 - cell.row, 7 - cell.col)
      })

      socket.on('capture-result', (result) => {
        const value = (result === 'checkmate') ? 'lost' : 'draw'
        setResult(value)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (error.response.status === 400) return navigate('/dashboard')
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells])

  // Check if the opponent is in check whenever the state changes.
  useEffect(() => {
    if (socket && gameId && !turn) {
      const isCheck = checkCheck(cells, player)
      const movePossible = canMove(cells, opponent, enpassCellSelf)
      if (!movePossible) {
        const result = (isCheck) ? 'checkmate' : 'stalemate'
        socket.emit('send-result', gameId, result)
        const value = (result === 'checkmate') ? 'won' : 'draw'
        setResult(value)
        const winner = (result === 'checkmate') ? player : 'draw'
        const data = { result: winner }
        axios.post(`/gameDetails/result?gameId=${gameId}`, data)
        .catch((error) => {
          if (error.response.status === 401) return navigate('/')
          if (error.response.status === 400) return navigate('/dashboard')
        })
      }
      else if (isCheck) {
        socket.emit('send-check', gameId)
        setOppCheck(true)
        const data = { check: opponent }
        axios.post(`/gameDetails/check?gameId=${gameId}`, data)
        .catch((error) => {
          if (error.response.status === 401) return navigate('/')
          if (error.response.status === 400) return navigate('/dashboard')
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      .catch((error) => {
        if (error.response.status === 401) return navigate('/')
        if (error.response.status === 400) return navigate('/dashboard')
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const move = { fromRow: click.row, fromCol: click.col, toRow, toCol, piece: click.piece, enpassCell, newPiece }
      socket.emit('game-move', gameId, move)
      setPromotedMove(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promotedMove])

  // Send the castling state to backend whenever it changes.
  useEffect(() => {
    const data = { player, castle: castling }
    axios.post(`/gameDetails/castle?gameId=${gameId}`, data)
    .catch((error) => {
      if (error.response.status === 401) return navigate('/')
      if (error.response.status === 400) return navigate('/dashboard')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [castling])

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
        .catch((error) => {
          if (error.response.status === 401) return navigate('/')
          if (error.response.status === 400) return navigate('/dashboard')
        })
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

      // Castling updates
      if (click.row === 7 && click.col === 0 && click.piece.includes('rook') && !castling.leftRook) {
        setCastle(castling.castled, castling.king, true, castling.rightRook)
      }
      else if (click.row === 7 && click.col === 7 && click.piece.includes('rook') && !castling.rightRook) {
        setCastle(castling.castled, castling.king, castling.leftRook, true)
      }
      else if (click.piece.includes('king') && !castling.king) {
        setCastle(castling.castled, true, castling.leftRook, castling.castled)
      }
      else if (click.piece.includes('king') && Math.abs(row - click.row) === 2) {
        setCastle(true, true, true, true)
      }
      
      if (click.piece.includes('king') && Math.abs(col - click.col) === 2) {
        setCastle(true, true, true, true)
        movePiece(click.row, click.col, row, col, click.piece, enpassCell, false, null, true)
      }
      else
        movePiece(click.row, click.col, row, col, click.piece, enpassCell, false, null)
      const move = { fromRow: click.row, fromCol: click.col, toRow: row, toCol: col, piece: click.piece, enpassCell }
      socket.emit('game-move', gameId, move)
      resetMove()
      resetClick()
      resetEnpass()
    }
    else // Else get the moves for the selected piece.
      getMoves(cells, row, col, type, enpassCell, check, castling)
  }

  return (
    <div className="flex flex-col items-center">
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
    enpassCellSelf: state.game.enpassCellSelf,
    castling: state.game.castling
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeChessboard: (player, currentBoard) =>
      dispatch(initializeChessboard(player, currentBoard)),
    movePiece: (fromRow, fromCol, toRow, toCol, piece, enpassCell, reverse, promotedPiece, castling) =>
      dispatch(movePiece(fromRow, fromCol, toRow, toCol, piece, enpassCell, reverse, promotedPiece, castling)),
    getMoves: (cells, row, col, piece, enpassCell, check, castling) =>
      dispatch(getMoves(cells, row, col, piece, enpassCell, check, castling)),
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
    setOppCheck: (check) =>
      dispatch(setOppCheck(check)),
    setEnpass: (row, col) =>
      dispatch(setEnpass(row, col)),
    resetEnpass: () =>
      dispatch(resetEnpass()),
    setSelfEnpass: (row, col) =>
      dispatch(setSelfEnpass(row, col)),
    resetSelfEnpass: () =>
      dispatch(resetSelfEnpass()),
    setCastle: (castled, king, leftRook, rightRook) =>
      dispatch(setCastle(castled, king, leftRook, rightRook)),
    setResult: (result) =>
      dispatch(setResult(result))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard)