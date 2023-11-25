import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DashBoard from './components/DashBoard'
import HomePage from './components/HomePage'
import GameRoom from './components/GameRoom'

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

          {/* Route to the game room */}
          <Route exact path="/game/:id" element={
            <>
              <GameRoom />
            </>
          }></Route>
        </Routes>
      </Router>  
    </div>
  )
}

export default App