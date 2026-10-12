import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { AgendaRoot } from '../components/AgendaRoot'

describe('AgendaRoot', () => {
  it('renders two month grids', () => {
    render(<AgendaRoot ariaLabel="Choose a date range" />)
    expect(screen.getAllByRole('grid', { name: 'Choose a date range' })).toHaveLength(2)
  })

  it('calls onRangeChange when selecting a range', () => {
    const onRangeChange = vi.fn()
    render(
      <AgendaRoot
        ariaLabel="Choose a date range"
        start={new Date(2024, 5, 1)}
        end={null}
        onRangeChange={onRangeChange}
      />
    )

    const endDay = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-15')
    expect(endDay).toBeTruthy()
    fireEvent.click(endDay!)

    expect(onRangeChange).toHaveBeenCalledWith({
      start: new Date(2024, 5, 1),
      end: new Date(2024, 5, 15),
    })
  })

  it('applies past temporal facet by disabling future days', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0))

    render(
      <AgendaRoot temporal="past" ariaLabel="Choose a date range" start={new Date(2024, 5, 1)} />
    )

    const futureDay = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-20')
    expect(futureDay?.getAttribute('aria-disabled')).toBe('true')

    vi.useRealTimers()
  })
})
