import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { resetBoard } from '../redux/actions/boardActions'
import { setGameId, resetGame } from '../redux/actions/gameActions'
import ChessBoard from './ChessBoard'
import Result from './Result'

const GameRoom = ({gameId, player, result, setGameId, resetBoard, resetGame}) => {
  // Create a state for socket
  const [socket, setSocket] = useState()
  const [resultState, setResult] = useState('hidden')
  const [text, setText] = useState('')

  // Create the socket connection on component load.
  useEffect(() => {
    setSocket(io())
    const url = window.location.href
    const urlParts = url.split('/')
    const gameId = urlParts[urlParts.length - 1]
    setGameId(gameId)

    return () => {
      if (socket) socket.disconnect()
      resetBoard()
      resetGame()
    }
  }, [])

  // Set the result text on result load.
  useEffect(() => {
    if (result) {
      setResult('')
      if (result === 'draw') setText('Game drawn')
      else if (result === player) setText('You won')
      else setText('You lost')
    }
  }, [result])

  // Join the room once the gameId has been set.
  useEffect(() => {
    if (socket && gameId) socket.emit('join-room', gameId)
  }, [socket, gameId])

  return (
    <div className="bg-gray-300">
      <div className="container mx-auto h-screen" id="game-container">
        <ChessBoard socket={socket} />
      </div>

      <Result status={resultState} text={text}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    gameId: state.game.gameId,
    player: state.game.player,
    result: state.game.result
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetBoard: () =>
      dispatch(resetBoard()),
    setGameId: (gameId) =>
      dispatch(setGameId(gameId)),
    resetGame: () => {
      dispatch(resetGame())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)