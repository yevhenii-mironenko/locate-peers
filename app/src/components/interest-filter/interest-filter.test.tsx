import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { InterestFilter } from './interest-filter'

describe('InterestFilter Component', () => {
  it('should render filter input', () => {
    render(<InterestFilter value="" onChange={vi.fn()} onClear={vi.fn()} resultsCount={100} />)

    expect(
      screen.getByPlaceholderText('Filter by interest (e.g., music, coding, travel...)')
    ).toBeInTheDocument()
  })

  it('should call onChange when typing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<InterestFilter value="" onChange={onChange} onClear={vi.fn()} resultsCount={100} />)

    const input = screen.getByPlaceholderText('Filter by interest (e.g., music, coding, travel...)')
    await user.type(input, 'music')

    expect(onChange).toHaveBeenCalled()
  })

  it('should show clear button when value is present', () => {
    render(<InterestFilter value="coding" onChange={vi.fn()} onClear={vi.fn()} resultsCount={50} />)

    expect(screen.getByLabelText('Clear filter')).toBeInTheDocument()
  })

  it('should not show clear button when value is empty', () => {
    render(<InterestFilter value="" onChange={vi.fn()} onClear={vi.fn()} resultsCount={100} />)

    expect(screen.queryByLabelText('Clear filter')).not.toBeInTheDocument()
  })

  it('should call onClear when clear button is clicked', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()

    render(<InterestFilter value="coding" onChange={vi.fn()} onClear={onClear} resultsCount={50} />)

    const clearButton = screen.getByLabelText('Clear filter')
    await user.click(clearButton)

    expect(onClear).toHaveBeenCalled()
  })

  it('should display results count when filter is active', () => {
    render(<InterestFilter value="coding" onChange={vi.fn()} onClear={vi.fn()} resultsCount={42} />)

    expect(screen.getByText('Found 42 users')).toBeInTheDocument()
  })

  it('should use singular form for single result', () => {
    render(<InterestFilter value="coding" onChange={vi.fn()} onClear={vi.fn()} resultsCount={1} />)

    expect(screen.getByText('Found 1 user')).toBeInTheDocument()
  })
})
