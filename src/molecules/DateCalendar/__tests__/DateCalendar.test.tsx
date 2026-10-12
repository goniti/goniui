import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import * as DateCalendar from '../index'

function renderDateCalendar(
  props: Partial<Parameters<typeof DateCalendar.Root>[0]> = {},
  triggerLabel = 'Choose a date'
) {
  return render(
    <DateCalendar.Root placeholder="Select a date" {...props}>
      <DateCalendar.Trigger ariaLabel={triggerLabel} />
      <DateCalendar.Content ariaLabel={triggerLabel} />
    </DateCalendar.Root>
  )
}

describe('DateCalendar', () => {
  it('renders the trigger button with placeholder text', () => {
    renderDateCalendar()
    expect(screen.getByRole('button', { name: 'Choose a date' })).toBeTruthy()
    expect(screen.getByText('Select a date')).toBeTruthy()
  })

  it('opens the calendar when the trigger is clicked', () => {
    renderDateCalendar()

    const trigger = screen.getByRole('button', { name: 'Choose a date' })
    fireEvent.click(trigger)

    expect(screen.getByRole('grid', { name: 'Choose a date' })).toBeTruthy()
  })

  it('displays the formatted value in the trigger when a date is selected', () => {
    const date = new Date(2024, 5, 15)
    renderDateCalendar({ value: date })
    expect(screen.getByText('Jun 15, 2024')).toBeTruthy()
  })

  it('calls onChange when a date is selected from the calendar', () => {
    const onChange = vi.fn()
    renderDateCalendar({ value: new Date(2024, 5, 1), onChange, defaultOpen: true })

    const dayButton = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-10')
    expect(dayButton).toBeTruthy()
    fireEvent.click(dayButton!)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toBeInstanceOf(Date)
  })

  it('formats dates using the provided locale', () => {
    const date = new Date(2024, 5, 15)
    renderDateCalendar({ value: date, locale: 'fr-FR' })
    expect(screen.getByText(/15 juin 2024/i)).toBeTruthy()
  })

  it('renders the trigger as disabled when disabled prop is set', () => {
    render(
      <DateCalendar.Root placeholder="Select a date">
        <DateCalendar.Trigger ariaLabel="Choose a date" disabled />
        <DateCalendar.Content ariaLabel="Choose a date" />
      </DateCalendar.Root>
    )
    const trigger = screen.getByRole('button', { name: 'Choose a date' })
    expect(trigger.hasAttribute('disabled')).toBe(true)
  })

  it('applies past temporal facet by capping selectable days at today', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0))

    renderDateCalendar({ temporal: 'past', defaultOpen: true, value: new Date(2024, 5, 1) })

    const futureDay = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-20')
    expect(futureDay?.getAttribute('aria-disabled')).toBe('true')

    vi.useRealTimers()
  })
})
