import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setGameId } from '../redux/actions/gameActions'
import ChessBoard from './ChessBoard'

const GameRoom = ({gameId, setGameId}) => {
  // Create a state for socket
  const [socket, setSocket] = useState()

  // Create the socket connection on component load.
  useEffect(() => {
    setSocket(io())
    const url = window.location.href
    const urlParts = url.split('/')
    const gameId = urlParts[urlParts.length - 1]
    setGameId(gameId)
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
    setGameId: (gameId) =>
      dispatch(setGameId(gameId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)