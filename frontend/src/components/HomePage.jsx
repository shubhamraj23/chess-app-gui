import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

const HomePage = () => {
  // React states to describe the status of the home page.
  const [pageCondition, setPageCondition] = useState('login')
  const [loginButton, setLoginButton] = useState('text-blue-500 hover:text-blue-700 border-b-2 border-blue-500')
  const [signupButton, setSignupButton] = useState('text-gray-500 hover:text-gray-700')
  const [loginForm, setLoginForm] = useState('')
  const [signupForm, setSignupForm] = useState('hidden mt-8')
  const [errorState, setErrorState] = useState('hidden')
  const [errorMessage, setErrorMessage] = useState('')
  const [color, setColor] = useState('error-colour')
  const [loading, setLoading] = useState('hidden')
  
  // React states to capture the input entered by the user.
  const [loginID, setLoginID] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupID, setSignupID] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupName, setSignupName] = useState('')

  // Using the useNavigate hook to navigate
  const navigate = useNavigate()

  // Variables to specify the classes of forms and labels.
  const labelClasses = 'block text-gray-600 text-sm font-semibold mb-2'
  const inputClasses = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
  const buttonClasses = 'w-full bg-blue-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none'

  // Validate the cookies on component load.
  useEffect(() => {
    axios.get('user/validateCookie')
      .then(() => {
        return navigate('/dashboard')
      })
      .catch(() => {})
  }, [])

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
    setLoading('')
    if (pageCondition === 'login') {
      const loginData = {
        userId: loginID,
        password: loginPassword
      }
      axios.post('user/login', loginData)
        .then(() => {
          setSignupID('')
          setSignupPassword('')
          setSignupName('')
          return navigate('/dashboard')
        })
        .catch((error) => {
          setErrorState('')
          if (error.response) {
            setErrorMessage(error.response.data.error)
          }
          else {
            setErrorMessage("Server Error. Please try again.")
          }
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
          setColor('success-colour')
          setErrorMessage('User successfully created. Please login')
          setSignupID('')
          setSignupPassword('')
          setSignupName('')
        })
        .catch((error) => {
          setErrorState('')
          setColor('error-colour')
          if (error.response) {
            setErrorMessage(error.response.data.error)
          }
          else {
            setErrorMessage("Server Error. Please try again.")
          }
        })
    }
    setLoading('hidden')
  }

  return (
    <div data-testid="homepage">
      <div className="bg-gray-100 flex items-center justify-center min-h-screen relative">
        <div className="bg-white w-96 rounded-lg shadow-lg">
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <button className={`px-4 py-2 font-semibold focus:outline-none ${loginButton}`} 
              onClick={()=>setPageCondition('login')} data-testid="login-button">Login</button>
            <button className={`px-4 py-2 font-semibold focus:outline-none ${signupButton}`}
              onClick={()=>setPageCondition('signup')} data-testid="signup-button">Signup</button>
          </div>
          
          <div className="p-6">
            <div className={loginForm} data-testid="login">
              <h2 className="text-2xl font-semibold text-gray-700">Login</h2>

              <div className={`${errorState} error-colour border-l-4 p-4 mt-2`} data-testid="login-error">
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

            <div className={signupForm} data-testid="signup">
              <h2 className="text-2xl font-semibold text-gray-700">Signup</h2>

              <div className={`${errorState} ${color} border-l-4 p-4 mt-2`} data-testid="signup-error">
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

      <Spinner status={loading} />
    </div>
  )
}

export default HomePage