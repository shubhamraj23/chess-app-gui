import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import axios from 'axios'
import DashBoard from '../components/DashBoard'

// Mock axios
jest.mock('axios')

// Mock useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('DashBoard Component', () => {
  test('Redirect on unsuccessful axios get call', async () => {
    // Mock axios get route to be rejected.
    axios.get.mockRejectedValueOnce(new Error())

    // Render the DashBoard component on the screen.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Router>
          <DashBoard />
        </Router>
      )
    })

    // Check that the dashboard component has been rendered.
    expect(screen.getByTestId('dashboard')).toBeInTheDocument()
    expect(axios.get).toHaveBeenCalledWith('/user/validateCookie')

    // Check that the page has been redirected.
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })


  test('Render on successful axios get call', async () => {
    // Mock axios get route to be resolved.
    axios.get.mockResolvedValue()

    // Render the DashBoard component on the screen.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Router>
          <DashBoard />
        </Router>
      )
    })

    // Check that the dashboard component has been rendered.
    expect(screen.getByTestId('dashboard')).toBeInTheDocument()
    expect(axios.get).toHaveBeenCalledWith('/user/validateCookie')
    expect(axios.get).toHaveBeenCalledWith('/user/stats')

    // Check that the page has not been redirected.
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  test('Check components have been rendered', async () => {
    // Mock axios get route to be resolved.
    axios.get.mockResolvedValue()

    // Render the DashBoard component on the screen.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Router>
          <DashBoard />
        </Router>
      )
    })

    // Check that the dashboard component has been rendered.
    expect(screen.getByTestId('dashboard')).toBeInTheDocument()
    expect(screen.getByTestId('logout')).toBeInTheDocument()
    expect(screen.getByTestId('stats')).toBeInTheDocument()
    expect(screen.getByTestId('button')).toBeInTheDocument()
    expect(screen.getByTestId('error')).toBeInTheDocument()

    // Find and test for the spinner components.
    const spinners = screen.getAllByTestId('spinner')
    spinners.forEach((spinner) => {expect(spinner).toBeInTheDocument()})
  })
})