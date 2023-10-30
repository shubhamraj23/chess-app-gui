import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DashBoard from './components/DashBoard'
import HomePage from './components/HomePage'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Default Route to the home page */}
          <Route exact path="/" element={
            <>
              <HomePage />
            </>
          }></Route>

          {/* Route to the dashboard */}
          <Route exact path="/dashboard" element={
            <>
              <DashBoard />
            </>
          }></Route>
        </Routes>
      </Router>  
    </div>
  )
}

export default App