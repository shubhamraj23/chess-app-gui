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
    
    // Check that the login container has been rendered and is visible.
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
    
    // Check that the login button has been rendered.
    const loginButton = screen.getByTestId('login-button')
    expect(loginButton).toBeInTheDocument()
    expect(loginButton).toHaveClass('text-blue-500 hover:text-blue-700 border-b-2 border-blue-500')
    
    // Check that the signup button has been rendered.
    const signupButton = screen.getByTestId('signup-button')
    expect(signupButton).toBeInTheDocument()
    expect(signupButton).toHaveClass('text-gray-500 hover:text-gray-700')
  })


  test('Check default homepage error states', async () => {
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
    
    // Check that the login error container has been rendered but is not visible.
    const loginError = screen.getByTestId('login-error')
    expect(loginError).toBeInTheDocument()
    expect(loginError).toHaveClass('hidden')
    expect(loginError.textContent).toBe('')
    
    // Check that the signup error container has been rendered but is not visible.
    const signupError = screen.getByTestId('signup-error')
    expect(signupError).toBeInTheDocument()
    expect(signupError).toHaveClass('hidden')
    expect(signupError.textContent).toBe('')
  })


  test('Check state change from login to signup', async () => {
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
    
    // Check that the login button and signup button have been rendered.
    const loginButton = screen.getByTestId('login-button')
    expect(loginButton).toBeInTheDocument()
    const signupButton = screen.getByTestId('signup-button')
    expect(signupButton).toBeInTheDocument()

    // Click on the button.
    fireEvent.click(signupButton)

    // Check that the signup container has been rendered and is visible.
    const signupContainer = screen.getByTestId('signup')
    expect(signupContainer).toBeInTheDocument()
    expect(signupContainer).not.toHaveClass()
    
    // Check that the login container has been rendered but is not visible.
    const loginContainer = screen.getByTestId('login')
    expect(loginContainer).toBeInTheDocument()
    expect(loginContainer).toHaveClass('hidden mt-8')

    // Check that the classes on the buttons have been changed.
    expect(signupButton).toHaveClass('text-blue-500 hover:text-blue-700 border-b-2 border-blue-500')
    expect(loginButton).toHaveClass('text-gray-500 hover:text-gray-700')
  })


  test('Check state change from signup to login', async () => {
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
    
    // Check that the login button and signup button have been rendered.
    const loginButton = screen.getByTestId('login-button')
    expect(loginButton).toBeInTheDocument()
    const signupButton = screen.getByTestId('signup-button')
    expect(signupButton).toBeInTheDocument()

    // Click on the button.
    fireEvent.click(signupButton)
    fireEvent.click(loginButton)

    // Check that the login container has been rendered and is visible.
    const loginContainer = screen.getByTestId('login')
    expect(loginContainer).toBeInTheDocument()
    expect(loginContainer).not.toHaveClass()
    
    // Check that the signup container has been rendered but is not visible.
    const signupContainer = screen.getByTestId('signup')
    expect(signupContainer).toBeInTheDocument()
    expect(signupContainer).toHaveClass('hidden mt-8')

    // Check that the classes on the buttons have been changed.
    expect(loginButton).toHaveClass('text-blue-500 hover:text-blue-700 border-b-2 border-blue-500')
    expect(signupButton).toHaveClass('text-gray-500 hover:text-gray-700')
  })


  test('Check state change on entering input in the login container', async () => {
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
    
    // Check that the input fields have been rendered.
    const loginID = screen.getByTestId('login-id')
    expect(loginID).toBeInTheDocument()
    const loginPassword = screen.getByTestId('login-password')
    expect(loginPassword).toBeInTheDocument()

    // Simulate typing in input.
    fireEvent.change(loginID, { target: { value: 'jali_batti' } })
    fireEvent.change(loginPassword, { target: { value: 'Shubham23' } })

    // Access the states and test the value.
    expect(loginID.value).toBe('jali_batti')
    expect(loginPassword.value).toBe('Shubham23')
  })


  test('Check state change on entering input in the signup container', async () => {
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

    // Check that the homepage component has been rendered and switch to signup container.
    expect(screen.getByTestId('homepage')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('signup-button'))

    // Check that the input fields have been rendered.
    const signupName = screen.getByTestId('signup-name')
    expect(signupName).toBeInTheDocument()
    const signupID = screen.getByTestId('signup-id')
    expect(signupID).toBeInTheDocument()
    const signupPassword = screen.getByTestId('signup-password')
    expect(signupPassword).toBeInTheDocument()

    // Simulate typing in input.
    fireEvent.change(signupName, { target: { value: 'SRP' } })
    fireEvent.change(signupID, { target: { value: 'jali_batti' } })
    fireEvent.change(signupPassword, { target: { value: 'Shubham23' } })

    // Access the states and test the value.
    expect(signupName.value).toBe('SRP')
    expect(signupID.value).toBe('jali_batti')
    expect(signupPassword.value).toBe('Shubham23')
  })
})