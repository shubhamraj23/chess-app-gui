import io from 'socket.io-client'
import { useEffect } from "react"
import ChessBoard from "./ChessBoard"

const GameRoom = () => {
  // Create the socket connection on component load.
  useEffect(() => {
    const socket = io()
    const url = window.location.href
    const urlParts = url.split('/')
    const gameId = urlParts[urlParts.length - 1]
    socket.emit('join-room', gameId)
  }, [])

  return (
    <div className="bg-gray-300">
      <div className="container mx-auto h-screen" id="game-container">
        <ChessBoard />
      </div>  
    </div>
    
  )
}

export default GameRoom