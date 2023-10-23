import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
        </Routes>
      </Router>  
    </div>
  )
}

export default App