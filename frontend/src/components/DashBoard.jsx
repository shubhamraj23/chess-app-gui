import { useState } from 'react'
import Logout from './Logout'
import Spinner from './Spinner'

const DashBoard = () => {
  const [loading, setLoading] = useState('hidden')

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Logout setLoading={setLoading} />

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Welcome, User!</h2>
        <p className="text-gray-600 text-center">Here are your stats:</p>
        <ul className="text-gray-700">
          <li>Total Games Played: 100</li>
          <li>Total Games Won: 250</li>
        </ul>
        <div className="flex justify-center">
          <button
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none"
            onClick={() => alert('Proceed to the next page')}
          >
            Start a new game
          </button>
        </div>
      </div>

      <Spinner status={loading} />
    </div>
  )
}

export default DashBoard