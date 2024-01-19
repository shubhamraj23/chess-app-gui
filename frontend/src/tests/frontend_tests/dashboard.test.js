import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import axios from 'axios'
import io from 'socket.io-client'
import DashBoard from '../../components/DashBoard'

// Mock axios
jest.mock('axios')
jest.mock('socket.io-client')

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
    expect(screen.getByTestId('spinner-normal')).toBeInTheDocument()
    expect(screen.getByTestId('spinner-text')).toBeInTheDocument()
  })


  test('Check stats data being reflected', async () => {
    // Mock first axios get route to be resolved.
    axios.get.mockResolvedValueOnce()

    // Mock second axios get route to be resolved with appropriate data.
    axios.get.mockResolvedValueOnce({
      data: {
        name: 'SRP',
        games: 2,
        wins: 1
      }
    })

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
    
    // Check that the text containers have been rendered.
    expect(screen.getByTestId('name')).toBeInTheDocument()
    expect(screen.getByTestId('games')).toBeInTheDocument()
    expect(screen.getByTestId('won')).toBeInTheDocument()
    
    // Check appropriate data to present in the fields.
    expect(screen.getByTestId('name')).toHaveTextContent('Welcome, SRP!')
    expect(screen.getByTestId('games')).toHaveTextContent('Total Games Played: 2')
    expect(screen.getByTestId('won')).toHaveTextContent('Total Games Won: 1')
  })


  test('Check stats data on request fail', async () => {
    // Mock first axios get route to be resolved.
    axios.get.mockResolvedValueOnce()

    // Mock second axios get route to be rejected.
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
    
    // Check that the text containers have been rendered.
    expect(screen.getByTestId('name')).toBeInTheDocument()
    expect(screen.getByTestId('games')).toBeInTheDocument()
    expect(screen.getByTestId('won')).toBeInTheDocument()
    
    // Check appropriate data to present in the fields.
    expect(screen.getByTestId('name')).toHaveTextContent('Welcome, User!')
    expect(screen.getByTestId('games')).toHaveTextContent('Total Games Played: 0')
    expect(screen.getByTestId('won')).toHaveTextContent('Total Games Won: 0')
  })


  test('Spinner visible on logout button click', async () => {
    // Mock axios get routes to be resolved.
    axios.get.mockResolvedValue()
    axios.post.mockResolvedValue()

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

    // Click on the logout button.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('logout'))
    })
    
    // Check that the spinner is visible.
    expect(screen.getByTestId('spinner-normal')).not.toHaveClass('hidden')
  })


  test('Spinner visible on match button click', async () => {
    // Mock axios get routes to be resolved.
    axios.get.mockResolvedValue()
    axios.post.mockRejectedValue(new Error())

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

    // Click on the matching button.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('button'))
    })
    
    // Check that the spinner is visible.
    expect(screen.getByTestId('spinner-text')).not.toHaveClass('hidden')
    expect(screen.getByTestId('spinner-text')).toHaveTextContent('Finding a match for you')
  })


  test('Error state on invalid post request', async () => {
    // Mock axios get routes to be resolved.
    axios.get.mockResolvedValue()
    axios.post.mockRejectedValue({
      response: {
        data: {
          error: 'Some random error.'
        }
      }
    })

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

    // Check the error class has been rendered.
    const error = screen.getByTestId('error')
    expect(error).toBeInTheDocument()
    expect(error).toHaveClass('hidden')

    // Click on the matching button.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('button'))
    })

    // Expect axios post request has been called.
    expect(axios.post).toHaveBeenCalledWith('/match')
    
    // Ensure the error comes after axios request is rejected.
    await waitFor(() => {
      expect(error).not.toHaveClass('hidden')
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(error).toHaveTextContent('Some random error.')
    })
  })


  test('Rerouting on valid post request', async () => {
    // Mock axios get routes to be resolved.
    axios.get.mockResolvedValue()
    axios.post.mockResolvedValue({ data: 'Some random data' })

    // Mock the Socket.IO methods
    const onMock = jest.fn()
    const emitMock = jest.fn()

    // Mock the socket instance and methods
    const socketMock = {
      on: onMock,
      emit: emitMock,
      disconnect: jest.fn()
    }
    io.mockReturnValue(socketMock)

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

    // Click on the matching button.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('button'))
    })

    // Expect axios post request has been called.
    expect(axios.post).toHaveBeenCalledWith('/match')
    
    // Simulate the socket event for 'match-found'
    const mockMatchData = { id: 'mockGameId' }
    await act(async () => {
      onMock.mock.calls[0][1](mockMatchData)
    })

    // Assert that socket.emit and navigate were called
    expect(emitMock).toHaveBeenCalledWith('match-request', { data: 'Some random data'})
    expect(mockNavigate).toHaveBeenCalledWith(`/game/${mockMatchData.id}`)
  })
})