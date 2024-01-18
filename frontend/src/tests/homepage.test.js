import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
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
    // Mock axios get route to be resolved.
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


  test('Check state change from login to signup and back to login', async () => {
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

    // Click on the button to toggle to signup page.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(signupButton)
    })

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

    // Click on the button to toggle to login page.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(loginButton)
    })

    // Check that the login container is visible.
    expect(loginContainer).not.toHaveClass()
    
    // Check that the signup container is not visible.
    expect(signupContainer).toHaveClass('hidden mt-8')

    // Check that the classes on the buttons have been changed.
    expect(loginButton).toHaveClass('text-blue-500 hover:text-blue-700 border-b-2 border-blue-500')
    expect(signupButton).toHaveClass('text-gray-500 hover:text-gray-700')
  })


  test('Check state change on entering input in the forms', async () => {
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
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(loginID, { target: { value: 'jali_batti' } })
      fireEvent.change(loginPassword, { target: { value: 'Shubham23' } })
    })

    // Access the states and test the value.
    expect(loginID.value).toBe('jali_batti')
    expect(loginPassword.value).toBe('Shubham23')

    // Click on the button to toggle to signup page.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('signup-button'))
    })

    // Check that the input fields have been rendered.
    const signupName = screen.getByTestId('signup-name')
    expect(signupName).toBeInTheDocument()
    const signupID = screen.getByTestId('signup-id')
    expect(signupID).toBeInTheDocument()
    const signupPassword = screen.getByTestId('signup-password')
    expect(signupPassword).toBeInTheDocument()

    // Simulate typing in input.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(signupName, { target: { value: 'SRP' } })
      fireEvent.change(signupID, { target: { value: 'jali_batti' } })
      fireEvent.change(signupPassword, { target: { value: 'Shubham23' } })  
    })

    // Access the states and test the value.
    expect(signupName.value).toBe('SRP')
    expect(signupID.value).toBe('jali_batti')
    expect(signupPassword.value).toBe('Shubham23')
  })


  test('Remove error state and error message on form submission', async () => {
    // Mock axios routes.
    axios.get.mockRejectedValueOnce(new Error())
    axios.post.mockRejectedValue({
      response: {
        data: {
          error: 'Some random error.'
        }
      }
    })
    
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

    // Check the login error class has been rendered.
    const loginError = screen.getByTestId('login-error')
    expect(loginError).toBeInTheDocument()
    expect(loginError).toHaveClass('hidden')
    
    // Simulate typing in input.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByTestId('login-id'), { target: { value: 'jali_batti' } })
      fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'Shubham23' } })  
    })

    // Click on the submit button.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('login-submit'))
    })
    
    // Ensure the error comes after axios request is completed.
    await waitFor(() => {
      expect(loginError).not.toHaveClass('hidden')
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(loginError).toHaveTextContent('Some random error.')
    })

    // Fire the request again.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.click(screen.getByTestId('login-submit'))
    })

    // Ensure the error message goes away immediately after the button click.
    await waitFor(() => {
      expect(loginError).toHaveClass('hidden')
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(loginError).not.toHaveTextContent('Some random error.')
    })

    // Click on the button to toggle to signup page.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('signup-button'))
    })

    // Check the signup error class has been rendered.
    const signupError = screen.getByTestId('signup-error')
    expect(signupError).toBeInTheDocument()
    expect(signupError).toHaveClass('hidden')
    
    // Simulate typing in input.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByTestId('signup-name'), { target: { value: 'SRP' } })
      fireEvent.change(screen.getByTestId('signup-id'), { target: { value: 'jali_batti' } })
      fireEvent.change(screen.getByTestId('signup-password'), { target: { value: 'Shubham23' } })  
    })

    // Click on the submit button.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('signup-submit'))
    })
    
    // Ensure the error comes after axios request is completed.
    await waitFor(() => {
      expect(signupError).not.toHaveClass('hidden')
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(signupError).toHaveTextContent('Some random error.')
    })

    // Fire the request again.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.click(screen.getByTestId('signup-submit'))
    })

    // Ensure the error message goes away immediately after the button click.
    await waitFor(() => {
      expect(signupError).toHaveClass('hidden')
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(signupError).not.toHaveTextContent('Some random error.')
    })
  })


  test('Successful Login', async () => {
    // Mock axios routes.
    axios.get.mockRejectedValueOnce(new Error())
    axios.post.mockResolvedValueOnce()
    
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

    // Check the login error class has been rendered.
    const loginError = screen.getByTestId('login-error')
    expect(loginError).toBeInTheDocument()
    expect(loginError).toHaveClass('hidden')
    
    // Simulate typing in input.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByTestId('login-id'), { target: { value: 'jali_batti' } })
      fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'Shubham23' } })  
    })

    // Click on the submit button.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('login-submit'))
    })
    
    // Ensure that no error comes after axios request is completed.
    await waitFor(() => {
      expect(loginError).toHaveClass('hidden')
    })

    // Ensure that the login fields are empty.
    expect(screen.getByTestId('login-id').value).toBe('')
    expect(screen.getByTestId('login-password').value).toBe('')

    // Ensure that the page has been redirected.
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })


  test('Unsuccessful Login', async () => {
    // Mock axios routes.
    axios.get.mockRejectedValueOnce(new Error())
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          error: 'Some random error.'
        }
      }
    })
    
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

    // Check the login error class has been rendered.
    const loginError = screen.getByTestId('login-error')
    expect(loginError).toBeInTheDocument()
    expect(loginError).toHaveClass('hidden')
    
    // Simulate typing in input.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByTestId('login-id'), { target: { value: 'jali_batti' } })
      fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'Shubham23' } })  
    })

    // Click on the submit button.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('login-submit'))
    })
    
    // Ensure the error comes after axios request is completed.
    await waitFor(() => {
      expect(loginError).not.toHaveClass('hidden')
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(loginError).toHaveTextContent('Some random error.')
    })

    // Ensure that the login fields are not empty.
    expect(screen.getByTestId('login-id').value).toBe('jali_batti')
    expect(screen.getByTestId('login-password').value).toBe('Shubham23')

    // Ensure that the page has not been redirected.
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  test('Successful Signup', async () => {
    // Mock axios routes.
    axios.get.mockRejectedValueOnce(new Error())
    axios.post.mockResolvedValueOnce()
    
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

    // Click on the button to toggle to signup page.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('signup-button'))
    })

    // Check the signup error class has been rendered.
    const signupError = screen.getByTestId('signup-error')
    expect(signupError).toBeInTheDocument()
    expect(signupError).toHaveClass('hidden')
    
    // Simulate typing in input.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByTestId('signup-name'), { target: { value: 'SRP' } })
      fireEvent.change(screen.getByTestId('signup-id'), { target: { value: 'jali_batti' } })
      fireEvent.change(screen.getByTestId('signup-password'), { target: { value: 'Shubham23' } })  
    })

    // Click on the submit button.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('signup-submit'))
    })
    
    // Ensure the message comes after axios request is completed.
    await waitFor(() => {
      expect(signupError).not.toHaveClass('hidden')
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(signupError).toHaveClass('success-colour')
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(signupError).toHaveTextContent('User successfully created. Please login.')
    })

    // Ensure that the login fields are empty.
    expect(screen.getByTestId('signup-name').value).toBe('')
    expect(screen.getByTestId('signup-id').value).toBe('')
    expect(screen.getByTestId('signup-password').value).toBe('')

    // Ensure that the page has not been redirected.
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  test('Unsuccessful Signup', async () => {
    // Mock axios routes.
    axios.get.mockRejectedValueOnce(new Error())
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          error: 'Some random error.'
        }
      }
    })
    
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

    // Click on the button to toggle to signup page.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('signup-button'))
    })

    // Check the signup error class has been rendered.
    const signupError = screen.getByTestId('signup-error')
    expect(signupError).toBeInTheDocument()
    expect(signupError).toHaveClass('hidden')
    
    // Simulate typing in input.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByTestId('signup-name'), { target: { value: 'SRP' } })
      fireEvent.change(screen.getByTestId('signup-id'), { target: { value: 'jali_batti' } })
      fireEvent.change(screen.getByTestId('signup-password'), { target: { value: 'Shubham23' } })  
    })

    // Click on the submit button.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('signup-submit'))
    })
    
    // Ensure the error comes after axios request is completed.
    await waitFor(() => {
      expect(signupError).not.toHaveClass('hidden')
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(signupError).toHaveClass('error-colour')
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(signupError).toHaveTextContent('Some random error.')
    })

    // Ensure that the login fields are not empty.
    expect(screen.getByTestId('signup-name').value).toBe('SRP')
    expect(screen.getByTestId('signup-id').value).toBe('jali_batti')
    expect(screen.getByTestId('signup-password').value).toBe('Shubham23')

    // Ensure that the page has not been redirected.
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})