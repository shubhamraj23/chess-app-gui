import { useNavigate } from 'react-router-dom'

const Result = ({status, text}) => {
  // Using the useNavigate hook to navigate
  const navigate = useNavigate()

  const handleClick = () => {
    return navigate('/dashboard')
  }
  
  return (
    <div className={`${status} absolute top-0`} data-testid="result">
      <div className="h-screen w-screen bg-gray-100 bg-opacity-70 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Game Over</h2>
          <p className="text-lg">{text}</p>
        </div>

        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleClick}>
          Return to homepage
        </button>
      </div>
    </div>
  )
}
  
export default Result