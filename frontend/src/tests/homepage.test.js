import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import axios from 'axios'
import HomePage from '../components/HomePage'

// Mock axios
jest.mock('axios')

// Mock useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('HomePage Component', () => {
  test('Render homepage Component on unsuccessful axios get call', async () => {
    // Mock axios get route to be rejected.
    axios.get.mockRejectedValueOnce(new Error())
    
    // Render the HomePage component on the screen.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Router>
          <HomePage />
        </Router>
      )
    })

    // Check that the homepage component has been rendered.
    expect(screen.getByTestId('homepage')).toBeInTheDocument()
    expect(axios.get).toHaveBeenCalledWith('user/validateCookie')
  })

  test('Call useNavigate on successful axios get call', async () => {
    // Mock axios get route to be rejected.
    axios.get.mockResolvedValueOnce()
    
    // Render the HomePage component on the screen.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Router>
          <HomePage />
        </Router>
      )
    })

    // Check that the homepage component has been rendered.
    expect(screen.getByTestId('homepage')).toBeInTheDocument()
    expect(axios.get).toHaveBeenCalledWith('user/validateCookie')
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })

  test('Check default homepage state', async () => {
    // Mock axios get route to be rejected.
    axios.get.mockRejectedValueOnce(new Error())
    
    // Render the HomePage component on the screen.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Router>
          <HomePage />
        </Router>
      )
    })

    // Check that the homepage component has been rendered.
    expect(screen.getByTestId('homepage')).toBeInTheDocument()
    
    // Check that the login component has been rendered and is visible.
    const loginContainer = screen.getByTestId('login')
    expect(loginContainer).toBeInTheDocument()
    expect(loginContainer).not.toHaveClass()
    
    // Check that the signup container has been rendered but is not visible.
    const signupContainer = screen.getByTestId('signup')
    expect(signupContainer).toBeInTheDocument()
    expect(signupContainer).toHaveClass('hidden mt-8')
  })

  test('Check default button state', async () => {
    // Mock axios get route to be rejected.
    axios.get.mockRejectedValueOnce(new Error())
    
    // Render the HomePage component on the screen.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Router>
          <HomePage />
        </Router>
      )
    })

    // Check that the homepage component has been rendered.
    expect(screen.getByTestId('homepage')).toBeInTheDocument()
    
    // Check that the login button has been rendered and is visible.
    const loginButton = screen.getByTestId('login-button')
    expect(loginButton).toBeInTheDocument()
    expect(loginButton).toHaveClass('text-blue-500 hover:text-blue-700 border-b-2 border-blue-500')
    
    // Check that the signup button has been rendered but is not visible.
    const signupButton = screen.getByTestId('signup-button')
    expect(signupButton).toBeInTheDocument()
    expect(signupButton).toHaveClass('text-gray-500 hover:text-gray-700')
  })

  test('Validate default homepage error states', async () => {
    // Mock axios get route to be rejected.
    axios.get.mockRejectedValueOnce(new Error())
    
    // Render the HomePage component on the screen.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Router>
          <HomePage />
        </Router>
      )
    })

    // Check that the homepage component has been rendered.
    expect(screen.getByTestId('homepage')).toBeInTheDocument()
    
    // Check that the login component has been rendered and is visible.
    const loginError = screen.getByTestId('login-error')
    expect(loginError).toBeInTheDocument()
    expect(loginError).toHaveClass('hidden')
    expect(loginError.textContent).toBe('')
    
    // Check that the signup container has been rendered but is not visible.
    const signupError = screen.getByTestId('signup-error')
    expect(signupError).toBeInTheDocument()
    expect(signupError).toHaveClass('hidden')
    expect(signupError.textContent).toBe('')
  })
})