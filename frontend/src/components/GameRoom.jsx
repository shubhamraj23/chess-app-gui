import axios from 'axios'
import io from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faFlag } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetBoard } from '../redux/actions/boardActions'
import { setGameId, setPlayer, resetGame } from '../redux/actions/gameActions'
import ChessBoard from './ChessBoard'
import Message from './Message'
import Result from './Result'
import Spinner from './Spinner'
import Timer from './Timer'

const GameRoom = ({gameId, result, setGameId, resetBoard, setPlayer, resetGame}) => {
  // Create a state for socket
  const [socket, setSocket] = useState()
  const [width, setWidth] = useState(0)
  const [divHeight, setDivHeight] = useState(0)
  const [connecting, setConnecting] = useState('')
  const [resultState, setResult] = useState('hidden')
  const [text, setText] = useState('')
  const [playerId, setPlayerId] = useState('User 1')
  const [playerName, setPlayerName] = useState('Name 1')
  const [opponentId, setOpponentId] = useState('User 2')
  const [opponentName, setOpponentName] = useState('Name 2')

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
      setDivHeight(Math.max(40, divWidth/16))
    }
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

  // Get the player type on gameId load.
  useEffect(() => {
    if (gameId) {
      axios.get(`/gameDetails/playerType?gameId=${gameId}`)
      .then((data) => {
        setPlayer(data.data.playerType)
        setPlayerId(data.data.player.id)
        setPlayerName(data.data.player.name)
        setOpponentId(data.data.opponent.id)
        setOpponentName(data.data.opponent.name)
      })
      .catch((error) => {
        if (error.response.status === 401) return navigate('/')
        if (error.response.status === 400) return navigate('/dashboard')
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

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
            <div className="flex flex-row h-full">
              <div className="w-1/3">
                <p className="text-sm">{opponentId}</p>
                <p className="text-sm">{opponentName}</p>
              </div>

              <div className="w-1/3"><Timer /></div>
            </div>
          </div>
          
          <div>
            <ChessBoard socket={socket} width={width}/>
          </div>
          
          <div style={{ width: `${width}px`, height: `${divHeight}px` }}>
            <div className="flex flex-row h-full">
              <div className="w-1/3 flex items-center h-full">
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" title="Request Draw">
                  <FontAwesomeIcon icon={faHandshake} />
                </button>

                <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded" title="Forfeit">
                  <FontAwesomeIcon icon={faFlag} />
                </button>
              </div>
              
              <div className="w-1/3"><Timer /></div>

              <div className="w-1/3">
                <p className="text-sm text-right">{playerId}</p>
                <p className="text-sm text-right">{playerName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Result status={resultState} text={text}/>
      {/* <Message status={''} text={'Do you want to forfeit?'}/> */}
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
    setPlayer: (player) => 
      dispatch(setPlayer(player)),
    resetGame: () => {
      dispatch(resetGame())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)