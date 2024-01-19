import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Spinner from '../../components/Spinner'

describe('Spinner Component', () => {
  test('Render Spinner without any text', () => {
    // Render the spinner on the screen.
    render(<Spinner status='' />)

    // Check that the spinner has been rendered without any text.
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.queryByText('Loading')).toBeNull()
  })

  test('Render Spinner with text', () => {
    // Render the spinner on the screen.
    render(<Spinner status='' text='Loading...'/>)

    // Check that the spinner has been rendered with the correct text.
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })


  test('Check for appropriate classes in the component', () => {
    // Render the spinner on the screen.
    render(<Spinner status='' text='Loading...'/>)

    // Check that the spinner container has the correct classes.
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    const spinnerContainer = screen.getByTestId('spinner')
    expect(spinnerContainer).toHaveClass('absolute top-0')
    
    expect(screen.getByTestId('animation')).toBeInTheDocument()
    const animationContainer = screen.getByTestId('animation')
    expect(animationContainer).toHaveClass('rounded-full animate-spin')
  })

  
  test('Check for hidden spinner', () => {
    // Render the spinner on the screen.
    render(<Spinner status='hidden' text='Loading...'/>)

    // Check that the spinner container has been rendered and has the correct classes.
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    const spinnerContainer = screen.getByTestId('spinner')
    expect(spinnerContainer).toHaveClass('hidden')
  })
})