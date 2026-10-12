import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import * as Agenda from '../index'

const contentLabels = {
  clearLabel: 'Clear',
  applyLabel: 'Apply',
}

function renderAgenda(
  rootProps: Partial<Parameters<typeof Agenda.Root>[0]> = {},
  contentProps: Partial<Parameters<typeof Agenda.Content>[0]> = {}
) {
  return render(
    <Agenda.Root locale="en-US" {...rootProps}>
      <Agenda.Trigger ariaLabel="Choose a date range" />
      <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} {...contentProps} />
    </Agenda.Root>
  )
}

describe('DateAgenda', () => {
  it('renders a segmented trigger defaulting to today', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 5, 12, 12, 0, 0))

    renderAgenda()
    expect(
      screen.getByRole('button', { name: 'Choose a date range, start year' }).textContent
    ).toBe('2024')

    vi.useRealTimers()
  })

  it('opens the popover and shows action bar labels', () => {
    renderAgenda({ defaultOpen: true })
    expect(screen.getByRole('button', { name: 'Clear' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Apply' })).toBeTruthy()
    expect(screen.getAllByRole('grid', { name: 'Choose a date range' })).toHaveLength(2)
  })

  it('commits the draft range when Apply is clicked', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 5, 12, 12, 0, 0))

    const onRangeChange = vi.fn()
    renderAgenda({ defaultOpen: true, onRangeChange }, { enableDrag: false })

    const startDay = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-10')
    const endDay = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-date') === '2024-06-15')
    fireEvent.click(startDay!)
    fireEvent.click(endDay!)
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

    expect(onRangeChange).toHaveBeenCalledWith({
      start: new Date(2024, 5, 10),
      end: new Date(2024, 5, 15),
    })

    vi.useRealTimers()
  })

  it('clears the draft range when Clear is clicked', () => {
    renderAgenda({
      defaultOpen: true,
      start: new Date(2024, 5, 1),
      end: new Date(2024, 5, 20),
    })

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }))

    const selected = screen
      .getAllByRole('button')
      .filter((btn) => btn.closest('[role="gridcell"]')?.getAttribute('aria-selected') === 'true')
    expect(selected).toHaveLength(0)
  })

  it('edits the draft (not the committed range) while the popover is open', () => {
    const onRangeChange = vi.fn()
    renderAgenda({ defaultOpen: true, onRangeChange })

    fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, add end date' }))
    expect(onRangeChange).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Apply' }))
    expect(onRangeChange).toHaveBeenCalledTimes(1)
  })

  it('commits a segment edit immediately while the popover is closed', () => {
    const onRangeChange = vi.fn()
    renderAgenda({ onRangeChange })

    fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, add end date' }))
    expect(onRangeChange).toHaveBeenCalledTimes(1)
  })

  it('commits a year segment edit when its drum is scrolled', async () => {
    const onRangeChange = vi.fn()
    const now = new Date()
    renderAgenda({ onRangeChange })

    fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, start year' }))
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve))
    })

    fireEvent.wheel(document.querySelector('ul')!, { deltaY: 120 })

    expect(onRangeChange).toHaveBeenCalled()
    const calls = onRangeChange.mock.calls
    const lastRange = calls[calls.length - 1][0]
    expect(lastRange.start.getFullYear()).toBe(now.getFullYear() + 1)
  })

  it('renders grouped presets inside the card', () => {
    const today = new Date(2024, 5, 12)
    vi.useFakeTimers()
    vi.setSystemTime(today)

    renderAgenda(
      { defaultOpen: true },
      {
        presets: [
          {
            label: 'Last 7 days',
            group: 'relative',
            getRange: () => ({ start: new Date(2024, 5, 5), end: today }),
          },
          {
            label: 'Last month',
            group: 'periods',
            getRange: () => ({ start: new Date(2024, 4, 1), end: new Date(2024, 4, 31) }),
          },
        ],
        presetsPlacement: 'left',
      }
    )

    expect(screen.getByRole('button', { name: 'Last 7 days' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Last month' })).toBeTruthy()

    vi.useRealTimers()
  })
})
