/**
 * UX regression suite for DateAgenda.
 * Each test maps to a user-reported interaction — add a case here whenever
 * a manual UX issue is fixed so it cannot regress silently.
 */
import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import * as Agenda from '../index'

const contentLabels = {
  clearLabel: 'Clear',
  applyLabel: 'Apply',
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

function ControlledAgenda({
  initial,
  defaultOpen = true,
  onRangeChange,
}: {
  initial: { start: Date | null; end: Date | null }
  defaultOpen?: boolean
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void
}) {
  const [range, setRange] = useState(initial)

  return (
    <Agenda.Root
      locale="en-US"
      defaultOpen={defaultOpen}
      start={range.start}
      end={range.end}
      onRangeChange={(next) => {
        setRange(next)
        onRangeChange?.(next)
      }}
    >
      <Agenda.Trigger ariaLabel="Choose a date range" className="w-80" />
      <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
    </Agenda.Root>
  )
}

describe('DateAgenda UX regression', () => {
  describe('segment drum picker', () => {
    it('does not change the year when the picker opens', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 5, 10, 12, 0, 0))

      const onRangeChange = vi.fn()
      render(
        <Agenda.Root locale="en-US" onRangeChange={onRangeChange}>
          <Agenda.Trigger ariaLabel="Choose a date range" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, start year' }))
      expect(onRangeChange).not.toHaveBeenCalled()
      expect(
        screen.getByRole('button', { name: 'Choose a date range, start year' }).textContent
      ).toBe('2026')

      vi.useRealTimers()
    })

    it('closes when the center selection band is clicked', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2024, 5, 12, 12, 0, 0))

      render(
        <Agenda.Root locale="en-US">
          <Agenda.Trigger ariaLabel="Choose a date range" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, start day' }))
      fireEvent.click(screen.getByRole('button', { name: 'OK' }))
      expect(screen.queryByLabelText('start day')).toBeNull()

      vi.useRealTimers()
    })

    it('closes when the active segment is clicked again', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2024, 5, 12, 12, 0, 0))

      render(
        <Agenda.Root locale="en-US">
          <Agenda.Trigger ariaLabel="Choose a date range" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      const daySegment = screen.getByRole('button', { name: 'Choose a date range, start day' })
      fireEvent.click(daySegment)
      expect(screen.getByLabelText('start day')).toBeTruthy()

      fireEvent.click(daySegment)
      expect(screen.queryByLabelText('start day')).toBeNull()

      vi.useRealTimers()
    })

    it('renders a compact floating panel over the segment, not a full-width card', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2024, 5, 12, 12, 0, 0))

      const { container } = render(
        <Agenda.Root locale="en-US">
          <Agenda.Trigger ariaLabel="Choose a date range" className="w-80" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, start month' }))

      const panel = container.querySelector('.-translate-y-1\\/2')
      expect(panel).toBeTruthy()
      expect(panel?.className).toContain('absolute')
      expect(panel?.className).not.toContain('w-full')

      vi.useRealTimers()
    })

    it('keeps the calendar icon inside the input while the drum picker is open', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2024, 5, 12, 12, 0, 0))

      render(
        <Agenda.Root locale="en-US">
          <Agenda.Trigger ariaLabel="Choose a date range" className="w-80" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      const inputShell = screen
        .getByRole('button', { name: 'Choose a date range, start day' })
        .closest('.rounded-lg.border')
      expect(inputShell).toBeTruthy()

      fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, start day' }))

      const calendarButton = screen.getByRole('button', {
        name: 'Choose a date range, open calendar',
      })
      expect(inputShell?.contains(calendarButton)).toBe(true)

      vi.useRealTimers()
    })

    it('keeps the calendar icon as the right-most control in the input', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2024, 5, 12, 12, 0, 0))

      render(
        <Agenda.Root locale="en-US" start={new Date(2024, 5, 10)} end={new Date(2024, 5, 18)}>
          <Agenda.Trigger ariaLabel="Choose a date range" className="w-80" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      const shell = screen
        .getByRole('button', { name: 'Choose a date range, start day' })
        .closest('.rounded-lg.border')!
      const buttons = Array.from(shell.querySelectorAll('button'))
      const calendarButton = screen.getByRole('button', {
        name: 'Choose a date range, open calendar',
      })
      expect(buttons[buttons.length - 1]).toBe(calendarButton)

      vi.useRealTimers()
    })

    it('fixes the calendar icon size and lets the input grow with the date', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2024, 5, 12, 12, 0, 0))

      render(
        <Agenda.Root locale="en-US">
          <Agenda.Trigger ariaLabel="Choose a date range" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      const calendarButton = screen.getByRole('button', {
        name: 'Choose a date range, open calendar',
      })
      expect(calendarButton.className).toContain('shrink-0')
      expect(calendarButton.closest('.w-fit')).toBeTruthy()

      vi.useRealTimers()
    })

    it('opens the calendar popover from the calendar button', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2024, 5, 12, 12, 0, 0))

      render(
        <Agenda.Root locale="en-US">
          <Agenda.Trigger ariaLabel="Choose a date range" className="w-80" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      expect(screen.queryAllByRole('grid')).toHaveLength(0)
      fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, open calendar' }))
      expect(screen.getAllByRole('grid', { name: 'Choose a date range' })).toHaveLength(2)

      vi.useRealTimers()
    })

    it('reveals the end segments after clicking add end date', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2024, 5, 12, 12, 0, 0))

      render(
        <Agenda.Root locale="en-US" start={new Date(2024, 5, 10)} end={null}>
          <Agenda.Trigger ariaLabel="Choose a date range" className="w-80" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      expect(screen.queryByRole('button', { name: 'Choose a date range, end day' })).toBeNull()
      fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, add end date' }))
      expect(screen.getByRole('button', { name: 'Choose a date range, end day' })).toBeTruthy()

      vi.useRealTimers()
    })

    it('closes the segment picker when clicking outside the trigger', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2024, 5, 12, 12, 0, 0))

      render(
        <Agenda.Root locale="en-US">
          <Agenda.Trigger ariaLabel="Choose a date range" className="w-80" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, start day' }))
      expect(screen.getByLabelText('start day')).toBeTruthy()

      fireEvent.mouseDown(document.body)
      expect(screen.queryByLabelText('start day')).toBeNull()

      vi.useRealTimers()
    })

    it('orders the segments by locale', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2024, 5, 12, 12, 0, 0))

      render(
        <Agenda.Root locale="fr-FR">
          <Agenda.Trigger ariaLabel="Pick a period" className="w-80" />
          <Agenda.Content ariaLabel="Pick a period" {...contentLabels} />
        </Agenda.Root>
      )

      const daySegment = screen.getByRole('button', { name: 'Pick a period, start day' })
      const monthSegment = screen.getByRole('button', {
        name: 'Pick a period, start month',
      })
      expect(
        daySegment.compareDocumentPosition(monthSegment) & Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy()

      vi.useRealTimers()
    })
  })

  describe('chronological range constraint', () => {
    it('lets a calendar end land before the start — the range orders itself', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 5, 25, 12, 0, 0))

      render(<ControlledAgenda initial={{ start: new Date(2026, 5, 25), end: null }} />)

      const jun20 = dayButton('2026-06-20')!
      expect(jun20.getAttribute('aria-disabled')).toBeNull()
      fireEvent.click(jun20)
      expect(selectedDates()).toEqual(
        expect.arrayContaining(['2026-06-20', '2026-06-21', '2026-06-24', '2026-06-25'])
      )

      vi.useRealTimers()
    })

    it('does not offer years before the start in the end segment picker', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 5, 25, 12, 0, 0))

      const { container } = render(
        <Agenda.Root locale="en-US" start={new Date(2026, 5, 25)} end={null}>
          <Agenda.Trigger ariaLabel="Choose a date range" className="w-80" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, add end date' }))
      fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, end year' }))

      const years = Array.from(container.querySelectorAll('ul li')).map((node) => node.textContent)
      expect(years).not.toContain('2024')
      expect(years).toContain('2026')

      vi.useRealTimers()
    })

    it('does not offer years after the end in the start segment picker', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2024, 4, 24, 12, 0, 0))

      const { container } = render(
        <Agenda.Root locale="en-US" start={new Date(2024, 0, 1)} end={new Date(2024, 4, 24)}>
          <Agenda.Trigger ariaLabel="Choose a date range" className="w-80" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      fireEvent.click(screen.getByRole('button', { name: 'Choose a date range, start year' }))

      const years = Array.from(container.querySelectorAll('ul li')).map((node) => node.textContent)
      expect(years).not.toContain('2026')
      expect(years).toContain('2024')

      vi.useRealTimers()
    })
  })

  describe('two-month calendar grid', () => {
    it('does not advance months when clicking day 8 in the right calendar', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 6, 6, 12, 0, 0))

      render(<ControlledAgenda initial={{ start: new Date(2026, 6, 6), end: null }} />)

      expect(screen.getByText('July 2026')).toBeTruthy()
      expect(screen.getByText('August 2026')).toBeTruthy()
      fireEvent.click(dayButton('2026-08-08')!)
      expect(screen.getByText('July 2026')).toBeTruthy()
      expect(screen.getByText('August 2026')).toBeTruthy()

      vi.useRealTimers()
    })

    it('keeps a jul 5–8 range stable without ghost selections after mousedown', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 6, 10, 12, 0, 0))

      render(
        <ControlledAgenda initial={{ start: new Date(2026, 6, 5), end: new Date(2026, 6, 8) }} />
      )

      const jul20 = dayButton('2026-07-20')!
      fireEvent.mouseDown(jul20, { clientX: 10, clientY: 10 })
      fireEvent.mouseUp(window)

      expect(selectedDates()).toEqual(
        expect.arrayContaining(['2026-07-05', '2026-07-06', '2026-07-07', '2026-07-08'])
      )
      expect(selectedDates()).not.toContain('2026-07-20')

      vi.useRealTimers()
    })

    it('drags from aug 3 to aug 11 without shifting the visible months', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 6, 6, 12, 0, 0))

      render(<ControlledAgenda initial={{ start: new Date(2026, 6, 6), end: null }} />)

      const aug3 = dayButton('2026-08-03')!
      const aug11 = dayButton('2026-08-11')!

      fireEvent.mouseDown(aug3, { clientX: 10, clientY: 10 })
      fireEvent.mouseMove(window, { clientX: 30, clientY: 10 })
      fireEvent.mouseEnter(aug11)
      fireEvent.mouseUp(window)

      expect(screen.getByText('July 2026')).toBeTruthy()
      expect(screen.getByText('August 2026')).toBeTruthy()
      expect(aug3.closest('[role="gridcell"]')?.getAttribute('aria-selected')).toBe('true')
      expect(aug11.closest('[role="gridcell"]')?.getAttribute('aria-selected')).toBe('true')

      vi.useRealTimers()
    })

    it('does not follow selection changes while the popover stays open', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 6, 6, 12, 0, 0))

      render(<ControlledAgenda initial={{ start: new Date(2026, 6, 6), end: null }} />)

      fireEvent.click(screen.getAllByRole('button', { name: 'Next month' })[1])
      expect(screen.getByText('July 2026')).toBeTruthy()
      expect(screen.getByText('September 2026')).toBeTruthy()

      fireEvent.click(dayButton('2026-09-15')!)
      expect(screen.getByText('July 2026')).toBeTruthy()
      expect(screen.getByText('September 2026')).toBeTruthy()

      vi.useRealTimers()
    })

    it('re-anchors visible months when the calendar popover reopens', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 5, 1, 12, 0, 0))

      function Harness() {
        const [open, setOpen] = useState(false)
        return (
          <Agenda.Root
            locale="en-US"
            open={open}
            onOpenChange={setOpen}
            start={new Date(2026, 8, 10)}
            end={null}
          >
            <Agenda.Trigger ariaLabel="Choose a date range" />
            <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
            <button type="button" onClick={() => setOpen(true)}>
              Reopen
            </button>
          </Agenda.Root>
        )
      }

      render(<Harness />)
      fireEvent.click(screen.getByRole('button', { name: 'Reopen' }))

      expect(screen.getByText('September 2026')).toBeTruthy()
      expect(screen.getByText('October 2026')).toBeTruthy()

      vi.useRealTimers()
    })

    it('moves each calendar independently via its own header arrows', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 6, 5, 12, 0, 0))

      render(<ControlledAgenda initial={{ start: new Date(2026, 6, 5), end: null }} />)

      expect(screen.getByText('July 2026')).toBeTruthy()
      expect(screen.getByText('August 2026')).toBeTruthy()

      fireEvent.click(screen.getAllByRole('button', { name: 'Next month' })[1])
      expect(screen.getByText('July 2026')).toBeTruthy()
      expect(screen.getByText('September 2026')).toBeTruthy()

      vi.useRealTimers()
    })
  })

  describe('presets', () => {
    it('re-anchors the calendar to the range when a preset jumps to another year', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 5, 11, 12, 0, 0))

      render(
        <Agenda.Root
          locale="en-US"
          defaultOpen
          start={new Date(2025, 5, 1)}
          end={new Date(2025, 5, 15)}
        >
          <Agenda.Trigger ariaLabel="Choose a date range" />
          <Agenda.Content
            ariaLabel="Choose a date range"
            {...contentLabels}
            presets={[
              {
                label: 'Current year',
                group: 'periods',
                getRange: () => ({ start: new Date(2026, 0, 1), end: new Date(2026, 5, 11) }),
              },
            ]}
            presetsPlacement="left"
          />
        </Agenda.Root>
      )

      expect(screen.getByText('June 2025')).toBeTruthy()

      fireEvent.click(screen.getByRole('button', { name: 'Current year' }))

      expect(screen.getByText('January 2026')).toBeTruthy()
      expect(screen.getByText('June 2026')).toBeTruthy()
      expect(screen.queryByText('February 2026')).toBeNull()
      expect(screen.queryByText('June 2025')).toBeNull()

      vi.useRealTimers()
    })
  })

  describe('action bar', () => {
    it('clears the range and closes the popover on Clear', () => {
      const onRangeChange = vi.fn()

      function Harness() {
        const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
          start: new Date(2026, 5, 1),
          end: new Date(2026, 5, 15),
        })
        return (
          <Agenda.Root
            locale="en-US"
            defaultOpen
            start={range.start}
            end={range.end}
            onRangeChange={(next) => {
              setRange(next)
              onRangeChange(next)
            }}
          >
            <Agenda.Trigger ariaLabel="Choose a date range" />
            <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
          </Agenda.Root>
        )
      }

      render(<Harness />)
      expect(screen.getAllByRole('grid')).toHaveLength(2)

      fireEvent.click(screen.getByRole('button', { name: 'Clear' }))

      expect(onRangeChange).toHaveBeenLastCalledWith({ start: null, end: null })
      expect(screen.queryAllByRole('grid')).toHaveLength(0)
    })
  })

  describe('temporal navigation bounds', () => {
    it('past mode opens without a future month and blocks the forward arrow', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 5, 11, 12, 0, 0))

      render(
        <Agenda.Root locale="en-US" temporal="past" defaultOpen>
          <Agenda.Trigger ariaLabel="Choose a date range" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      expect(screen.getByText('May 2026')).toBeTruthy()
      expect(screen.getByText('June 2026')).toBeTruthy()
      expect(screen.queryByText('July 2026')).toBeNull()

      const nextButtons = screen.getAllByRole('button', { name: 'Next month' })
      expect((nextButtons[1] as HTMLButtonElement).disabled).toBe(true)
      expect(
        (screen.getAllByRole('button', { name: 'Previous month' })[0] as HTMLButtonElement).disabled
      ).toBe(false)

      vi.useRealTimers()
    })

    it('future mode blocks the backward arrow on the earliest month', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 5, 11, 12, 0, 0))

      render(
        <Agenda.Root locale="en-US" temporal="future" defaultOpen>
          <Agenda.Trigger ariaLabel="Choose a date range" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      expect(screen.getByText('June 2026')).toBeTruthy()
      expect(screen.getByText('July 2026')).toBeTruthy()

      const prevButtons = screen.getAllByRole('button', { name: 'Previous month' })
      expect((prevButtons[0] as HTMLButtonElement).disabled).toBe(true)
      expect(
        (screen.getAllByRole('button', { name: 'Next month' })[1] as HTMLButtonElement).disabled
      ).toBe(false)

      vi.useRealTimers()
    })

    it('blocks the inner arrows when both calendars sit on adjacent months', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 5, 11, 12, 0, 0))

      render(
        <Agenda.Root locale="en-US" defaultOpen>
          <Agenda.Trigger ariaLabel="Choose a date range" />
          <Agenda.Content ariaLabel="Choose a date range" {...contentLabels} />
        </Agenda.Root>
      )

      expect(
        (screen.getAllByRole('button', { name: 'Next month' })[0] as HTMLButtonElement).disabled
      ).toBe(true)
      expect(
        (screen.getAllByRole('button', { name: 'Previous month' })[1] as HTMLButtonElement).disabled
      ).toBe(true)

      vi.useRealTimers()
    })
  })
})
