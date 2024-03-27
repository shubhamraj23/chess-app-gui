import axios from 'axios'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetBoard } from '../redux/actions/boardActions'
import { setGameId, resetGame } from '../redux/actions/gameActions'
import ChessBoard from './ChessBoard'
import Result from './Result'
import Spinner from './Spinner'

const GameRoom = ({gameId, result, setGameId, resetBoard, resetGame}) => {
  // Create a state for socket
  const [socket, setSocket] = useState()
  const [width, setWidth] = useState(0)
  const [divHeight, setDivHeight] = useState(0)
  const [connecting, setConnecting] = useState('')
  const [resultState, setResult] = useState('hidden')
  const [text, setText] = useState('')

  // Using the useNavigate hook to navigate
  const navigate = useNavigate()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Validate the cookies on component load.
  useEffect(() => {
    axios.get('/user/validateCookie')
      .catch(() => {
        return navigate('/')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Decide the width and height of the ChessBoard component on load.
  useEffect(() => {
    const screenWidth = document.getElementById('game-container').offsetWidth
    const screenHeight = window.innerHeight
    if (screenWidth > screenHeight) {
      const lower = 0.9*screenHeight
      const divWidth = lower - (lower % 8)
      setWidth(divWidth)
      setDivHeight((screenHeight - divWidth)/2)
    }
    else {
      const lower = Math.min(screenWidth, 0.9*screenHeight)
      const divWidth = lower - (lower % 8)
      setWidth(divWidth)
      setDivHeight(divWidth/16)
    }
    console.log(screenHeight, screenWidth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Set the result text on result load.
  useEffect(() => {
    if (result) {
      setResult('')
      if (result === 'draw') setText('Game drawn')
      else if (result === 'won') setText('You won')
      else setText('You lost')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  // Create and handle socket connection once the gameId has been set.
  useEffect(() => {
    if (socket)  {
      socket.on('connect', () => {
        setConnecting('hidden')
      })

      socket.on('disconnect', () => {
        setConnecting('')
      })

      socket.on('reconnect', () => {
        setConnecting('hidden')
      })

      if (gameId) socket.emit('join-room', gameId)
    }
  }, [socket, gameId])

  return (
    <div className="bg-gray-300">
      <div className="container mx-auto h-screen flex flex-col items-center" id="game-container">
        <div className="my-auto" style={{ width: `${width}px`, height: `${2*divHeight + width}px` }}>
          <div style={{ width: `${width}px`, height: `${divHeight}px` }}>
            <h2 className="text-lg font-semibold mb-4">Player's Name: XYZ</h2>
          </div>
          
          <div>
            <ChessBoard socket={socket} width={width}/>
          </div>
          
          <div style={{ width: `${width}px`, height: `${divHeight}px` }}>
            <h2 className="text-lg font-semibold mb-4">Player's Name: XYZ</h2>
          </div>
        </div>
      </div>

      <Result status={resultState} text={text}/>
      <Spinner status={connecting} text="Connection lost. Retrying..." />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    gameId: state.game.gameId,
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