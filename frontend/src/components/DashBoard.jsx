import axios from 'axios'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logout from './Logout'
import Spinner from './Spinner'

const DashBoard = () => {
  const [name, setName] = useState('User')
  const [games, setGames] = useState(0)
  const [wins, setWins] = useState(0)
  const [loading, setLoading] = useState('hidden')
  const [findingMatch, setFindingMatch] = useState('hidden')
  const [errorState, setErrorState] = useState('hidden')
  const [errorMessage, setErrorMessage] = useState('')

  // Using the useNavigate hook to navigate
  const navigate = useNavigate()

  // Validate the cookies on component load.
  useEffect(() => {
    axios.get('/user/validateCookie')
      .then(() => {
        axios.get('/user/stats')
          .then((data) => {
            setName(data.data.name)
            setGames(data.data.games)
            setWins(data.data.wins)
          })
          .catch(() => {})
      })
      .catch(() => {
        return navigate('/')
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Create a match request on button click.
  const matchRequest = () => {
    setFindingMatch('')
    axios.post('/match')
      .then((data) => {
        // Create a Web Socket connection.
        const socket = io()

        // Make a matching request.
        socket.emit('match-request', data)

        // Navigate to game room on successful match.
        socket.on('match-found', (data) => {
          setFindingMatch('hidden')
          socket.disconnect()
          navigate(`/game/${data.id}`)
        })

        // Throw an error if match is not found.
        socket.on('match-not-found', () => {
          setFindingMatch('hidden')
          setErrorState('')
          setErrorMessage("Unable to find a match. Please try again later.")
        })
      })
      .catch((error) => {
        setFindingMatch('hidden')
        setErrorState('')
          if (error.response) {
            setErrorMessage(error.response.data.error)
          }
          else {
            setErrorMessage("Server Error. Please try again.")
          }
      })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center" data-testid="dashboard">
      <Logout setLoading={setLoading} />

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md" data-testid="stats">
        <h2 className="text-2xl font-semibold text-center" data-testid="name">Welcome, {name}!</h2>
        <p className="text-gray-600 text-center">Here are your stats:</p>
        <ul className="text-gray-700">
          <li data-testid="games">Total Games Played: {games}</li>
          <li data-testid="won">Total Games Won: {wins}</li>
        </ul>
        <div className="flex justify-center">
          <button
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none"
            onClick={matchRequest} data-testid="button"
          >
            Start a new game
          </button>
        </div>
      </div>

      <div className={`${errorState} max-w-md w-full error-colour border-l-4 p-4 mt-2`} data-testid="error">
        <p><strong>{errorMessage}</strong></p>
      </div>

      <Spinner status={loading} />
      <Spinner status={findingMatch} text="Finding a match for you..." />
    </div>
  )
}

export default DashBoard