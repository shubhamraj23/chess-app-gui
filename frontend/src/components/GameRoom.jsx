import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { resetBoard } from '../redux/actions/boardActions'
import { setGameId, resetGame } from '../redux/actions/gameActions'
import ChessBoard from './ChessBoard'
import Result from './Result'

const GameRoom = ({gameId, setGameId}) => {
  // Create a state for socket
  const [socket, setSocket] = useState()
  const [result, setResult] = useState('hidden')

  // Create the socket connection on component load.
  useEffect(() => {
    setSocket(io())
    const url = window.location.href
    const urlParts = url.split('/')
    const gameId = urlParts[urlParts.length - 1]
    setGameId(gameId)

    return () => {
      resetBoard()
      resetGame()
    }
  }, [])

  // Join the room once the gameId has been set.
  useEffect(() => {
    if (socket && gameId) socket.emit('join-room', gameId)
  }, [socket, gameId])

  return (
    <div className="bg-gray-300">
      <div className="container mx-auto h-screen" id="game-container">
        <ChessBoard socket={socket} />
      </div>

      <Result status={result} text={'You just lost'}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    gameId: state.game.gameId
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