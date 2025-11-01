import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ErrorScreen } from './error-screen'

describe('ErrorScreen Component', () => {
  it('should render error message', () => {
    const error = new Error('Test error')

    render(<ErrorScreen error={error} />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(
      screen.getByText(
        "We couldn't load the users data. Please try again later or reload the page."
      )
    ).toBeInTheDocument()
  })

  it('should display error details when message is present', () => {
    const error = new Error('Network connection failed')

    render(<ErrorScreen error={error} />)

    expect(screen.getByText('Error: Network connection failed')).toBeInTheDocument()
  })

  it('should reload page when button is clicked', async () => {
    const user = userEvent.setup()
    const reloadMock = vi.fn()

    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    })

    const error = new Error('Test error')
    render(<ErrorScreen error={error} />)

    const button = screen.getByRole('button', { name: 'Reload page' })
    await user.click(button)

    expect(reloadMock).toHaveBeenCalled()
  })
})
