import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import axios from 'axios'
import Logout from '../components/Logout'

// Mock axios
jest.mock('axios')

// Mock useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

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
    const mockSetLoading = jest.fn()

    // Mock axios post route to be resolved.
    axios.post.mockResolvedValueOnce()

    // Render the Logout component on the screen.
    render(
      <Router>
        <Logout setLoading={mockSetLoading}/>
      </Router>
    )

    // Check that the logout component has been rendered.
    expect(screen.getByTestId('logout')).toBeInTheDocument()
    const logoutButton = screen.getByTestId('logout')

    // Fire the function call by clicking on the button.
    fireEvent.click(logoutButton)
    expect(mockSetLoading).toHaveBeenCalledWith('')
  })


  test('Call navigate on successful logout', async () => {
    // Mock the functions.
    const mockSetLoading = jest.fn()

    // Mock axios post route to be resolved.
    axios.post.mockResolvedValueOnce()

    // Render the Logout component on the screen
    render(
      <Router>
        <Logout setLoading={mockSetLoading}/>
      </Router>
    )

    // Check that the logout component has been rendered.
    expect(screen.getByTestId('logout')).toBeInTheDocument()
    const logoutButton = screen.getByTestId('logout')
    
    // Fire the function call.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(logoutButton)
    })

    expect(mockSetLoading).toHaveBeenCalledWith('')
    expect(axios.post).toHaveBeenCalledWith('user/logout')
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  
  test('Call navigate on unsuccessful logout', async () => {
    // Mock the functions.
    const mockSetLoading = jest.fn()

    // Mock axios post route to be resolved.
    axios.post.mockRejectedValueOnce(new Error())

    // Render the Logout component on the screen
    render(
      <Router>
        <Logout setLoading={mockSetLoading}/>
      </Router>
    )

    // Check that the logout component has been rendered.
    expect(screen.getByTestId('logout')).toBeInTheDocument()
    const logoutButton = screen.getByTestId('logout')
    
    // Fire the function call.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(logoutButton)
    })

    expect(mockSetLoading).toHaveBeenCalledWith('')
    expect(axios.post).toHaveBeenCalledWith('user/logout')
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})