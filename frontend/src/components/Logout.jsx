import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Logout = ({setLoading}) => {
  // Using the useNavigate hook to navigate
  const navigate = useNavigate()

  const logoutUser = () => {
    setLoading('')
    axios.post('user/logout')
      .then(() => {
        return navigate('/')
      })
      .catch(() => {
        return navigate('/')
      })
  }

  return (
    <button
        className="absolute top-0 right-0 m-4 px-3 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600"
        onClick={logoutUser} data-testid="logout"
      >
        Logout
      </button>
  )
}

export default Logout