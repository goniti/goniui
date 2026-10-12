import { act, fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { AgendaPanels } from '../components/AgendaPanels'
import type { DateRangeValue } from '../hooks/useDateRange'

function ControlledPanels({
  initial,
  viewResetKey = 1,
  onRangeChange,
}: {
  initial: DateRangeValue
  viewResetKey?: number
  onRangeChange?: (range: DateRangeValue) => void
}) {
  const [range, setRange] = useState(initial)

  return (
    <AgendaPanels
      viewResetKey={viewResetKey}
      start={range.start}
      end={range.end}
      onRangeChange={(next) => {
        setRange(next)
        onRangeChange?.(next)
      }}
    />
  )
}

function dayButton(isoDate: string) {
  return screen.getAllByRole('button').find((btn) => btn.getAttribute('data-date') === isoDate)
}

function selectedDates() {
  return screen
    .getAllByRole('button')
    .filter((btn) => btn.closest('[role="gridcell"]')?.getAttribute('aria-selected') === 'true')
    .map((btn) => btn.getAttribute('data-date'))
}

describe('AgendaPanels integration', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('selects a start date with a single click', () => {
    // Without a value the calendars open on the current month.
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 6, 15))
    const onRangeChange = vi.fn()
    render(<AgendaPanels onRangeChange={onRangeChange} />)

    fireEvent.click(dayButton('2026-07-05')!)

    expect(onRangeChange).toHaveBeenLastCalledWith({
      start: new Date(2026, 6, 5),
      end: null,
    })
    expect(selectedDates()).toEqual(['2026-07-05'])
  })

  it('lets the second pick land before the start — the range orders itself', () => {
    const onRangeChange = vi.fn()
    render(
      <ControlledPanels
        initial={{ start: new Date(2026, 5, 25), end: null }}
        onRangeChange={onRangeChange}
      />
    )

    const jun20 = dayButton('2026-06-20')!
    expect(jun20.getAttribute('aria-disabled')).toBeNull()

    fireEvent.click(jun20)
    expect(onRangeChange).toHaveBeenLastCalledWith({
      start: new Date(2026, 5, 20),
      end: new Date(2026, 5, 25),
    })
  })

  it('completes a range with two clicks on the right calendar without shifting months', () => {
    const onRangeChange = vi.fn()
    render(
      <ControlledPanels
        initial={{ start: new Date(2026, 6, 6), end: null }}
        onRangeChange={onRangeChange}
      />
    )

    expect(screen.getByText('July 2026')).toBeTruthy()
    expect(screen.getByText('August 2026')).toBeTruthy()

    fireEvent.click(dayButton('2026-08-03')!)

    expect(screen.getByText('July 2026')).toBeTruthy()
    expect(screen.getByText('August 2026')).toBeTruthy()
    expect(onRangeChange).toHaveBeenLastCalledWith({
      start: new Date(2026, 6, 6),
      end: new Date(2026, 7, 3),
    })
    expect(selectedDates()).toEqual(
      expect.arrayContaining(['2026-07-06', '2026-08-01', '2026-08-02', '2026-08-03'])
    )
  })

  it('does not flash a drag preview on a simple click', () => {
    render(
      <AgendaPanels viewResetKey={1} start={new Date(2026, 6, 5)} end={new Date(2026, 6, 8)} />
    )

    const jul20 = dayButton('2026-07-20')!
    fireEvent.mouseDown(jul20, { clientX: 10, clientY: 10 })
    fireEvent.mouseUp(window)

    expect(selectedDates()).toEqual(
      expect.arrayContaining(['2026-07-05', '2026-07-06', '2026-07-07', '2026-07-08'])
    )
    expect(selectedDates()).not.toContain('2026-07-20')
  })

  it('drags a range within the right calendar', () => {
    const onRangeChange = vi.fn()
    render(
      <AgendaPanels
        viewResetKey={1}
        start={new Date(2026, 6, 6)}
        end={null}
        onRangeChange={onRangeChange}
      />
    )

    const aug3 = dayButton('2026-08-03')!
    const aug11 = dayButton('2026-08-11')!

    fireEvent.mouseDown(aug3, { clientX: 10, clientY: 10 })
    fireEvent.mouseMove(window, { clientX: 30, clientY: 10 })
    fireEvent.mouseEnter(aug11)
    fireEvent.mouseUp(window)

    expect(screen.getByText('July 2026')).toBeTruthy()
    expect(screen.getByText('August 2026')).toBeTruthy()
    expect(onRangeChange).toHaveBeenLastCalledWith({
      start: new Date(2026, 7, 3),
      end: new Date(2026, 7, 11),
    })
  })

  it('starts a new range on the third click', () => {
    const onRangeChange = vi.fn()
    render(
      <ControlledPanels
        initial={{ start: new Date(2026, 6, 5), end: new Date(2026, 6, 8) }}
        onRangeChange={onRangeChange}
      />
    )

    fireEvent.click(dayButton('2026-07-20')!)

    expect(onRangeChange).toHaveBeenLastCalledWith({
      start: new Date(2026, 6, 20),
      end: null,
    })
    expect(selectedDates()).toEqual(['2026-07-20'])
  })

  it('navigates the two calendars independently with their own header arrows', () => {
    render(<AgendaPanels viewResetKey={1} start={new Date(2026, 6, 5)} end={null} />)

    expect(screen.getByText('July 2026')).toBeTruthy()
    expect(screen.getByText('August 2026')).toBeTruthy()

    // The right calendar advances without moving the left one.
    fireEvent.click(screen.getAllByRole('button', { name: 'Next month' })[1])
    expect(screen.getByText('July 2026')).toBeTruthy()
    expect(screen.getByText('September 2026')).toBeTruthy()

    // The left calendar moves back without moving the right one.
    fireEvent.click(screen.getAllByRole('button', { name: 'Previous month' })[0])
    expect(screen.getByText('June 2026')).toBeTruthy()
    expect(screen.getByText('September 2026')).toBeTruthy()
  })

  it('advances only the right calendar when a drag dwells at the right edge', () => {
    vi.useFakeTimers()
    vi.spyOn(HTMLDivElement.prototype, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      right: 200,
      top: 0,
      bottom: 300,
      width: 200,
      height: 300,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect)

    render(<AgendaPanels viewResetKey={1} start={new Date(2026, 6, 6)} end={null} />)
    expect(screen.getByText('July 2026')).toBeTruthy()
    expect(screen.getByText('August 2026')).toBeTruthy()

    fireEvent.mouseDown(dayButton('2026-07-10')!, { clientX: 10, clientY: 10 })
    fireEvent.mouseMove(window, { clientX: 30, clientY: 10 })
    fireEvent.mouseMove(window, { clientX: 190, clientY: 10 })
    act(() => vi.advanceTimersByTime(650))

    expect(screen.getByText('July 2026')).toBeTruthy()
    expect(screen.getByText('September 2026')).toBeTruthy()

    fireEvent.mouseUp(window)
    vi.useRealTimers()
  })

  it('re-anchors both visible months when viewResetKey changes', () => {
    const { rerender } = render(
      <AgendaPanels viewResetKey={1} start={new Date(2026, 5, 1)} end={null} />
    )

    expect(screen.getByText('June 2026')).toBeTruthy()
    expect(screen.getByText('July 2026')).toBeTruthy()
    fireEvent.click(screen.getAllByRole('button', { name: 'Next month' })[1])
    expect(screen.getByText('August 2026')).toBeTruthy()

    rerender(<AgendaPanels viewResetKey={2} start={new Date(2026, 8, 10)} end={null} />)
    expect(screen.getByText('September 2026')).toBeTruthy()
    expect(screen.getByText('October 2026')).toBeTruthy()
  })
})
