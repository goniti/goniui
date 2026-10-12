import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CalendarRoot } from '../components/CalendarRoot'

function renderCalendar(props: Partial<Parameters<typeof CalendarRoot>[0]> = {}) {
  return render(
    <CalendarRoot
      ariaLabel="Choose a date"
      prevMonthLabel="Previous month"
      nextMonthLabel="Next month"
      {...props}
    />
  )
}

describe('CalendarRoot', () => {
  it('renders a grid with accessible label', () => {
    renderCalendar()
    expect(screen.getByRole('grid', { name: 'Choose a date' })).toBeTruthy()
  })

  it('renders 7 column headers (weekdays)', () => {
    renderCalendar()
    const cols = screen.getAllByRole('columnheader')
    expect(cols).toHaveLength(7)
  })

  it('marks the selected date as aria-selected', () => {
    const selected = new Date(2024, 5, 15) // June 15, 2024
    renderCalendar({ value: selected })
    const selectedButton = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-15')
    expect(selectedButton).toBeTruthy()
    expect(selectedButton?.closest('[role="gridcell"]')?.getAttribute('aria-selected')).toBe('true')
  })

  it('calls onChange when a day is clicked', () => {
    const onChange = vi.fn()
    renderCalendar({ value: new Date(2024, 5, 1), onChange })

    const dayButton = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-10')
    expect(dayButton).toBeTruthy()
    fireEvent.click(dayButton!)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toBeInstanceOf(Date)
  })

  it('navigates to the next month when the next button is clicked', () => {
    renderCalendar({ value: new Date(2024, 5, 1) }) // June 2024

    const nextBtn = screen.getByRole('button', { name: 'Next month' })
    fireEvent.click(nextBtn)

    expect(screen.getByText(/july/i)).toBeTruthy()
  })

  it('navigates to the previous month when the previous button is clicked', () => {
    renderCalendar({ value: new Date(2024, 5, 1) }) // June 2024

    const prevBtn = screen.getByRole('button', { name: 'Previous month' })
    fireEvent.click(prevBtn)

    expect(screen.getByText(/may/i)).toBeTruthy()
  })

  it('disables dates outside min/max range', () => {
    const today = new Date(2024, 5, 15)
    const min = new Date(2024, 5, 10)
    renderCalendar({ value: today, min })

    const disabledDay = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-05')
    expect(disabledDay).toBeTruthy()
    expect(disabledDay?.getAttribute('aria-disabled')).toBe('true')
  })

  it('does not call onChange for disabled dates', () => {
    const onChange = vi.fn()
    const today = new Date(2024, 5, 15)
    const min = new Date(2024, 5, 10)
    renderCalendar({ value: today, min, onChange })

    const disabledDay = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-05')
    if (disabledDay) fireEvent.click(disabledDay)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('accepts a custom locale for month labels', () => {
    renderCalendar({ value: new Date(2024, 5, 1), locale: 'fr-FR' })
    expect(screen.getByText(/juin/i)).toBeTruthy()
  })

  it('moves focus with arrow keys and selects the focused day with Enter', () => {
    const onChange = vi.fn()
    renderCalendar({ value: new Date(2024, 5, 10), onChange }) // June 10, 2024

    const grid = screen.getByRole('grid')
    fireEvent.keyDown(grid, { key: 'ArrowRight' }) // June 10 -> 11

    const focused = document.activeElement as HTMLElement
    expect(focused.getAttribute('data-date')).toBe('2024-06-11')

    fireEvent.keyDown(focused, { key: 'Enter' })
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].getDate()).toBe(11)
  })

  it('moves a week with ArrowDown and a month with PageDown', () => {
    renderCalendar({ value: new Date(2024, 5, 10) }) // June 10

    const grid = screen.getByRole('grid')
    fireEvent.keyDown(grid, { key: 'ArrowDown' }) // +1 week -> June 17
    expect((document.activeElement as HTMLElement).getAttribute('data-date')).toBe('2024-06-17')

    fireEvent.keyDown(grid, { key: 'PageDown' }) // +1 month -> July 17
    expect(screen.getByText(/july/i)).toBeTruthy()
    expect((document.activeElement as HTMLElement).getAttribute('data-date')).toBe('2024-07-17')
  })

  it('disables the next-month arrow at the max bound', () => {
    renderCalendar({ value: new Date(2026, 5, 15), max: new Date(2026, 5, 30) }) // June, max in June
    const next = screen.getByRole('button', { name: 'Next month' }) as HTMLButtonElement
    expect(next.disabled).toBe(true)
    expect(
      (screen.getByRole('button', { name: 'Previous month' }) as HTMLButtonElement).disabled
    ).toBe(false)
  })

  it('disables the previous-month arrow at the min bound', () => {
    renderCalendar({ value: new Date(2026, 5, 15), min: new Date(2026, 5, 1) }) // June, min in June
    const prev = screen.getByRole('button', { name: 'Previous month' }) as HTMLButtonElement
    expect(prev.disabled).toBe(true)
    expect((screen.getByRole('button', { name: 'Next month' }) as HTMLButtonElement).disabled).toBe(
      false
    )
  })

  it('highlights an inclusive date range', () => {
    renderCalendar({
      rangeStart: new Date(2024, 5, 10),
      rangeEnd: new Date(2024, 5, 12),
      value: new Date(2024, 5, 1),
    })

    const start = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-10')
    const middle = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-11')
    const end = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-12')

    expect(start?.closest('[role="gridcell"]')?.getAttribute('aria-selected')).toBe('true')
    expect(middle?.closest('[role="gridcell"]')?.getAttribute('aria-selected')).toBe('true')
    expect(end?.closest('[role="gridcell"]')?.getAttribute('aria-selected')).toBe('true')
  })

  describe('day-cell shape', () => {
    const dayButton = (date: string) =>
      screen.getAllByRole('button').find((btn) => btn.getAttribute('data-date') === date)

    it('defaults to soft: the selected cell keeps rounded-lg (no visual regression)', () => {
      renderCalendar({ value: new Date(2024, 5, 15) })
      expect(dayButton('2024-06-15')?.className).toContain('rounded-lg')
    })

    it('soft: range ends keep rounded-l-lg / rounded-r-lg', () => {
      renderCalendar({
        rangeStart: new Date(2024, 5, 10),
        rangeEnd: new Date(2024, 5, 12),
        value: new Date(2024, 5, 1),
      })
      expect(dayButton('2024-06-10')?.className).toContain('rounded-l-lg')
      expect(dayButton('2024-06-12')?.className).toContain('rounded-r-lg')
    })

    it('round: the selected cell becomes a full circle (rounded-full)', () => {
      renderCalendar({ value: new Date(2024, 5, 15), dayShape: 'round' })
      const selected = dayButton('2024-06-15')
      expect(selected?.className).toContain('rounded-full')
      expect(selected?.className).not.toContain('rounded-lg')
    })

    it('round: range ends become half circles (rounded-l-full / rounded-r-full)', () => {
      renderCalendar({
        rangeStart: new Date(2024, 5, 10),
        rangeEnd: new Date(2024, 5, 12),
        value: new Date(2024, 5, 1),
        dayShape: 'round',
      })
      expect(dayButton('2024-06-10')?.className).toContain('rounded-l-full')
      expect(dayButton('2024-06-12')?.className).toContain('rounded-r-full')
    })
  })
})
