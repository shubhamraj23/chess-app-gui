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
  test('Render HomePage Component on unsuccessful axios get call', async () => {
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
})