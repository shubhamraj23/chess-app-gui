import { useState, useEffect } from 'react'

const HomePage = () => {
  const [pageCondition, setPageCondition] = useState('login')
  const [loginButton, setLoginButton] = useState('text-blue-500 hover:text-blue-700 border-b-2 border-blue-500')
  const [signupButton, setSignupButton] = useState('text-gray-500 hover:text-gray-700')
  const [loginForm, setLoginForm] = useState('')
  const [signupForm, setSignupForm] = useState('hidden mt-8')
  
  useEffect(() => {
    if (pageCondition === "login") {
      setLoginButton('text-blue-500 hover:text-blue-700 border-b-2 border-blue-500')
      setSignupButton('text-gray-500 hover:text-gray-700')
      setLoginForm('')
      setSignupForm('hidden mt-8')
    }
    else {
      setLoginButton('text-gray-500 hover:text-gray-700')
      setSignupButton('text-blue-500 hover:text-blue-700 border-b-2 border-blue-500')
      setLoginForm('hidden mt-8')
      setSignupForm('')
    }
  }, [pageCondition])

  const changeCondition = (pageState) => {
    setPageCondition(pageState)
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white w-96 rounded-lg shadow-lg">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <button className={`px-4 py-2 font-semibold focus:outline-none ${loginButton}`} onClick={()=>changeCondition("login")}>Login</button>
          <button className={`px-4 py-2 font-semibold focus:outline-none ${signupButton}`} onClick={()=>changeCondition("signup")}>Signup</button>
        </div>
        
      <div className="p-6">
        <div className={loginForm}>
          <h2 className="text-2xl font-semibold text-gray-700">Login</h2>
            <form className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="login-id">User ID</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" type="text" id="login-id" placeholder="User ID" required />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="login-password">Password</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" type="password" id="login-password" placeholder="Password" required />
              </div>
              
              <button className="w-full bg-blue-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none">Login</button>
            </form>
          </div>

          <div className={signupForm}>
            <h2 className="text-2xl font-semibold text-gray-700">Signup</h2>
            <form className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="signup-name">Name</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" type="text" id="signup-name" placeholder="Name" required />
              </div>
                    
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="signup-id">User ID</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" type="text" id="signup-id" placeholder="User ID" required />
              </div>
                    
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="signup-password">Password</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" type="password" id="signup-password" placeholder="Password" required />
              </div>
              <button className="w-full bg-blue-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none">Signup</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage