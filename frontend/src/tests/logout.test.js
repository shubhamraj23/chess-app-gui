import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import Logout from '../components/Logout'

describe('Logout Component', () => {
  test('Render Logout Component', () => {
    // Render the Logout component on the screen.
    render(
      <Router>
        <Logout />
      </Router>
    )

    // Check that the logout component has been rendered without crashing.
    expect(screen.getByTestId('logout')).toBeInTheDocument()
    const container = screen.getByTestId('logout')
    expect(container).toHaveClass('absolute top-0 bg-red-500 text-white')
  })

  test('Check setLoading call on button click', () => {
    // Mock a function.
    const setLoadingMock = jest.fn()
    // Render the Logout component on the screen.
    render(
      <Router>
        <Logout setLoading={setLoadingMock}/>
      </Router>
    )

    // Check that the logout component has been rendered.
    expect(screen.getByTestId('logout')).toBeInTheDocument()
    const logoutButton = screen.getByTestId('logout')

    // Fire the function call by clicking on the button.
    fireEvent.click(logoutButton)
    expect(setLoadingMock).toHaveBeenCalledWith('')
  })
})