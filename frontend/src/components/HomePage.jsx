import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  // React states to describe the status of the home page.
  const [pageCondition, setPageCondition] = useState('login')
  const [loginButton, setLoginButton] = useState('text-blue-500 hover:text-blue-700 border-b-2 border-blue-500')
  const [signupButton, setSignupButton] = useState('text-gray-500 hover:text-gray-700')
  const [loginForm, setLoginForm] = useState('')
  const [signupForm, setSignupForm] = useState('hidden mt-8')
  const [errorState, setErrorState] = useState('hidden')
  const [errorMessage, setErrorMessage] = useState('')
  const [color, setColor] = useState('red')
  
  // React states to capture the input entered by the user.
  const [loginID, setLoginID] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupID, setSignupID] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupName, setSignupName] = useState('')

  // Using the useHistory hook to navigate
  const navigate = useNavigate()

  // Variables to specify the classes of forms and labels.
  const labelClasses = 'block text-gray-600 text-sm font-semibold mb-2'
  const inputClasses = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
  const buttonClasses = 'w-full bg-blue-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none'

  // Change the status of home page.
  useEffect(() => {
    if (pageCondition === "login") {
      setLoginButton('text-blue-500 hover:text-blue-700 border-b-2 border-blue-500')
      setSignupButton('text-gray-500 hover:text-gray-700')
      setLoginForm('')
      setSignupForm('hidden mt-8')
      setErrorState('hidden')
      setErrorMessage('')
    }
    else {
      setLoginButton('text-gray-500 hover:text-gray-700')
      setSignupButton('text-blue-500 hover:text-blue-700 border-b-2 border-blue-500')
      setLoginForm('hidden mt-8')
      setSignupForm('')
      setErrorState('hidden')
      setErrorMessage('')
    }
  }, [pageCondition])

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrorState('hidden')
    setErrorMessage('')
    if (pageCondition === 'login') {
      const loginData = {
        userId: loginID,
        password: loginPassword
      }
      axios.post('user/login', loginData)
        .then(() => {
          return navigate('/dashboard')
        })
        .catch((error) => {
          setErrorState('')
          setErrorMessage(error.response.data.error)
        })
    }
    else {
      const signupData = {
        name: signupName,
        userId: signupID,
        password: signupPassword
      }
      axios.post('user/signup', signupData)
        .then(() => {
          setErrorState('')
          setColor('emerald')
          setErrorMessage('User successfully created. Please login')
          setSignupID('')
          setSignupPassword('')
          setSignupName('')
        })
        .catch((error) => {
          setErrorState('')
          setColor('red')
          setErrorMessage(error.response.data.error)
        })
    }
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white w-96 rounded-lg shadow-lg">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <button className={`px-4 py-2 font-semibold focus:outline-none ${loginButton}`} onClick={()=>setPageCondition('login')}>Login</button>
          <button className={`px-4 py-2 font-semibold focus:outline-none ${signupButton}`} onClick={()=>setPageCondition('signup')}>Signup</button>
        </div>
        
        <div className="p-6">
          <div className={loginForm}>
            <h2 className="text-2xl font-semibold text-gray-700">Login</h2>

            <div className={`${errorState} bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-2`}>
              <p><strong>{errorMessage}</strong></p>
            </div>

            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className={labelClasses}>Username</label>
                <input className={inputClasses} type="text" placeholder="Username" 
                  value={loginID} onChange={(e) => setLoginID(e.target.value)} required />
              </div>

              <div className="mb-4">
                <label className={labelClasses}>Password</label>
                <input className={inputClasses} type="password" placeholder="Password"
                  value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              </div>
              
              <button className={buttonClasses}>Login</button>
            </form>
          </div>

          <div className={signupForm}>
            <h2 className="text-2xl font-semibold text-gray-700">Signup</h2>

            <div className={`${errorState} bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4 mt-2`}>
              <p><strong>{errorMessage}</strong></p>
            </div>
            
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className={labelClasses}>Name</label>
                <input className={inputClasses} type="text" placeholder="Name"
                  value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
              </div>
                    
              <div className="mb-4">
                <label className={labelClasses}>Username</label>
                <input className={inputClasses} type="text" placeholder="Username"
                  value={signupID} onChange={(e) => setSignupID(e.target.value)} required />
              </div>
                    
              <div className="mb-4">
                <label className={labelClasses}>Password</label>
                <input className={inputClasses} type="password" placeholder="Password"
                  value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
              </div>

              <button className={buttonClasses}>Signup</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage