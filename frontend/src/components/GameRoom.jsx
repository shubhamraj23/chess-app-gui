import axios from 'axios'
import io from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faFlag } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetBoard } from '../redux/actions/boardActions'
import { setGameId, setPlayer, setResult, resetGame } from '../redux/actions/gameActions'
import { setPlayerTimerStatus, setOpponentTimerStatus, resetTimer } from '../redux/actions/timeActions'
import ChessBoard from './ChessBoard'
import Message from './Message'
import Result from './Result'
import Spinner from './Spinner'
import Timer from './Timer'

const GameRoom = ({
    gameId, opponent, turn, result, playerTime, playerTimerRunning, opponentTime, opponentTimerRunning,
    setGameId, resetBoard, setPlayer, setResult, setPlayerTimerStatus, setOpponentTimerStatus, resetGame
  }) => {
  
  // Create a state for socket
  const [socket, setSocket] = useState()

  // Create states to align the contents
  const [width, setWidth] = useState(0)
  const [divHeight, setDivHeight] = useState(0)

  // Create states for spinners
  const [connecting, setConnecting] = useState('')
  const [connectingText, setConnectingText] = useState('Connecting...')
  
  // Create states for result
  const [resultState, setResultState] = useState('hidden')
  const [text, setText] = useState('')
  
  // Create states for messages
  const [messageStatus, setMessageStatus] = useState('hidden')
  const [messageText, setMessageText] = useState('Are you sure?')
  const [messageTimer, setMessageTimer] = useState(false)

  // Create states for player and opponent details
  const [playerId, setPlayerId] = useState('Your opponent')
  const [playerName, setPlayerName] = useState('Your opponent')
  const [opponentId, setOpponentId] = useState('Your opponent')
  const [opponentName, setOpponentName] = useState('Your opponent')

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
      resetTimer()
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

  // Update the timer whenever turn changes.
  useEffect(() => {
    if (turn) {
      setPlayerTimerStatus(true)
      setOpponentTimerStatus(false)
    }
    else {
      setOpponentTimerStatus(true)
      setPlayerTimerStatus(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn])

  // Set the result text on result load.
  useEffect(() => {
    if (result) {
      setResultState('')
      setPlayerTimerStatus(false)
      setOpponentTimerStatus(false)
      if (result === 'draw') setText('Game drawn')
      else if (result === 'won') setText('You won')
      else if (result === 'forfeit') setText(`${opponentId} forfeited. You won.`)
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
        setConnectingText('')
      })

      socket.on('disconnect', () => {
        setConnecting('')
        setConnectingText('Connection lost. Retrying...')
      })

      socket.on('reconnect', () => {
        setConnecting('hidden')
        setConnectingText('')
      })

      socket.on('capture-draw-request', () => {
        setMessageStatus('')
        setMessageText(`${opponentId} is requesting for a draw. Accept?`)
        setMessageTimer(true)
      })

      socket.on('capture-draw-response', (status) => {
        setConnecting('hidden')
        setConnectingText('')
        if (status) setResult('draw')
        else alert(`${opponentId} has rejected the draw request.`)
      })

      if (gameId) socket.emit('join-room', gameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, gameId, opponentId])

  const handleRequest = (request) => {
    setMessageStatus('')
    if (request === 'draw') setMessageText('Are you sure you want to request a draw?')
    else setMessageText('Are you sure you want to forfeit?')
  }

  const handleClick = (status) => {
    if (messageTimer) setMessageTimer(false)
    if (!status && messageText.includes('Accept?')) socket.emit('draw-response', gameId, false)
    if (status) {
      if (messageText.includes('forfeit')) {
        socket.emit('send-result', gameId, 'forfeit')
        setResult('lost')
        axios.post(`/gameDetails/result?gameId=${gameId}`, { result: opponent })
        .catch((error) => {
          if (error.response.status === 401) return navigate('/')
          if (error.response.status === 400) return navigate('/dashboard')
        })
      }
      else if (messageText.includes('Accept?')) {
        socket.emit('draw-response', gameId, true)
        setResult('draw')
        axios.post(`/gameDetails/result?gameId=${gameId}`, { result: 'draw' })
        .catch((error) => {
          if (error.response.status === 401) return navigate('/')
          if (error.response.status === 400) return navigate('/dashboard')
        })
      }
      else {
        socket.emit('draw-request', gameId)
        setConnecting('')
        setConnectingText('Waiting for the response...')
      }
    }
    setMessageText('')
    setMessageStatus('hidden')
  }

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

              <div className="w-1/3">
                <Timer running={opponentTimerRunning} initialTime={opponentTime} />
              </div>
            </div>
          </div>
          
          <div>
            <ChessBoard socket={socket} width={width}/>
          </div>
          
          <div style={{ width: `${width}px`, height: `${divHeight}px` }}>
            <div className="flex flex-row h-full">
              <div className="w-1/3 flex items-center h-full">
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" title="Request Draw"
                  onClick={() => handleRequest('draw')}>
                    <FontAwesomeIcon icon={faHandshake} />
                </button>

                <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded" title="Forfeit"
                  onClick={() => handleRequest('forfeit')}>
                    <FontAwesomeIcon icon={faFlag} />
                </button>
              </div>
              
              <div className="w-1/3">
                <Timer running={playerTimerRunning} initialTime={playerTime} />
              </div>

              <div className="w-1/3">
                <p className="text-sm text-right">{playerId}</p>
                <p className="text-sm text-right">{playerName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Result status={resultState} text={text}/>
      <Message status={messageStatus} text={messageText} handleClick={handleClick} messageTimer={messageTimer}/>
      <Spinner status={connecting} text={connectingText} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    gameId: state.game.gameId,
    opponent: state.game.opponent,
    turn: state.game.turn,
    result: state.game.result,
    playerTime: state.time.playerTime,
    playerTimerRunning: state.time.playerTimerRunning,
    opponentTime: state.time.opponentTime,
    opponentTimerRunning: state.time.opponentTimerRunning
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
    resetGame: () =>
      dispatch(resetGame()),
    setResult: (result) =>
      dispatch(setResult(result)),
    setPlayerTimerStatus: (status) =>
      dispatch(setPlayerTimerStatus(status)),
    setOpponentTimerStatus: (status) =>
      dispatch(setOpponentTimerStatus(status)),
    resetTimer: () =>
      dispatch(resetTimer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)