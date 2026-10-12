'use client'

import {
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useId,
  useRef,
} from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Button } from '@/atoms/Button'
import { Box } from '@/atoms/layout/Box'

import type { CalendarDay } from '../hooks/useCalendar'
import { isoDate } from '../lib/calendarUtils'

const dayVariants = tv({
  base:
    'inline-flex h-9 w-9 items-center justify-center text-sm transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
  variants: {
    state: {
      default: 'text-foreground hover:bg-surface-2',
      selected: 'bg-primary-400 text-primary-foreground hover:bg-primary-300',
      today: 'font-semibold text-primary-700 hover:bg-surface-2',
      outside: 'text-foreground-muted hover:bg-surface-2',
      disabled: 'pointer-events-none text-foreground-muted opacity-50',
      rangeStart: 'bg-primary-400 text-primary-foreground hover:bg-primary-300',
      rangeEnd: 'bg-primary-400 text-primary-foreground hover:bg-primary-300',
      rangeSingle: 'bg-primary-400 text-primary-foreground hover:bg-primary-300',
      inRange: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
    },
    shape: { soft: '', round: '' },
  },
  compoundVariants: [
    {
      state: ['default', 'today', 'outside', 'disabled', 'selected', 'rangeSingle'],
      shape: 'soft',
      class: 'rounded-lg',
    },
    { state: 'rangeStart', shape: 'soft', class: 'rounded-l-lg' },
    { state: 'rangeEnd', shape: 'soft', class: 'rounded-r-lg' },
    { state: 'inRange', shape: 'soft', class: 'rounded-none' },
    {
      state: ['default', 'today', 'outside', 'disabled', 'selected', 'rangeSingle'],
      shape: 'round',
      class: 'rounded-full',
    },
    { state: 'rangeStart', shape: 'round', class: 'rounded-l-full' },
    { state: 'rangeEnd', shape: 'round', class: 'rounded-r-full' },
    { state: 'inRange', shape: 'round', class: 'rounded-none' },
  ],
  defaultVariants: { state: 'default', shape: 'soft' },
})

type DayState = NonNullable<VariantProps<typeof dayVariants>['state']>
export type DayShape = NonNullable<VariantProps<typeof dayVariants>['shape']>

const DAY_STATE_RULES: { state: DayState; test: (day: CalendarDay) => boolean }[] = [
  { state: 'disabled', test: (d) => d.isDisabled },
  { state: 'rangeSingle', test: (d) => d.isRangeStart && d.isRangeEnd },
  { state: 'rangeStart', test: (d) => d.isRangeStart },
  { state: 'rangeEnd', test: (d) => d.isRangeEnd },
  { state: 'inRange', test: (d) => d.isInRange },
  { state: 'selected', test: (d) => d.isSelected },
  { state: 'outside', test: (d) => !d.isCurrentMonth },
  { state: 'today', test: (d) => d.isToday },
]

function resolveDayState(day: CalendarDay): DayState {
  return DAY_STATE_RULES.find((rule) => rule.test(day))?.state ?? 'default'
}

type FocusDelta = { delta: number; unit: 'day' | 'week' | 'month' }
const KEY_TO_DELTA: Partial<Record<string, FocusDelta>> = {
  ArrowLeft: { delta: -1, unit: 'day' },
  ArrowRight: { delta: 1, unit: 'day' },
  ArrowUp: { delta: -1, unit: 'week' },
  ArrowDown: { delta: 1, unit: 'week' },
  PageUp: { delta: -1, unit: 'month' },
  PageDown: { delta: 1, unit: 'month' },
}

export interface CalendarDayInteraction {
  onDayMouseDown?: (date: Date, event: ReactMouseEvent) => void
  onDayMouseEnter?: (date: Date) => void
}

export interface CalendarMonthGridProps {
  weeks: CalendarDay[][]
  weekdayLabels: Array<{ short: string; long: string }>
  ariaLabel: string
  value: Date | null
  focusedDate: Date | null
  setFocusedDate: (date: Date) => void
  selectDate: (date: Date) => void
  moveFocus: (delta: number, unit: 'day' | 'week' | 'month') => void
  dayInteraction?: CalendarDayInteraction
  /** Cell shape: `soft` (rounded, default) or `round` (circle + half-circle range ends). */
  dayShape?: DayShape
}

/**
 * @internal Month grid renderer — swap this file (or replace with a lib adapter)
 * without changing `useCalendar` or the public `Calendar.Root` API.
 */
export function CalendarMonthGrid({
  weeks,
  weekdayLabels,
  ariaLabel,
  value,
  focusedDate,
  setFocusedDate,
  selectDate,
  moveFocus,
  dayInteraction,
  dayShape = 'soft',
}: CalendarMonthGridProps) {
  const gridId = useId()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (focusedDate === null) return
    const key = isoDate(focusedDate)
    const el = gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${key}"]`)
    el?.focus()
  }, [focusedDate])

  function handleGridKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const move = KEY_TO_DELTA[event.key]
    if (move) {
      event.preventDefault()
      moveFocus(move.delta, move.unit)
    }
  }

  function handleDayKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: Date) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectDate(date)
    }
  }

  return (
    <div
      ref={gridRef}
      role="grid"
      aria-label={ariaLabel}
      id={gridId}
      className="w-full"
      onKeyDown={handleGridKeyDown}
    >
      <Box role="row" className="grid grid-cols-7">
        {weekdayLabels.map(({ short, long }) => (
          <Box
            key={long}
            role="columnheader"
            aria-label={long}
            className="pb-2 text-center text-xs font-medium text-foreground-muted"
          >
            {short}
          </Box>
        ))}
      </Box>
      {weeks.map((week, weekIndex) => (
        <Box key={weekIndex} role="row" className="grid grid-cols-7">
          {week.map((day) => {
            const isActive = focusedDate
              ? day.key === isoDate(focusedDate)
              : value != null
                ? day.isSelected
                : day.isToday

            const state = resolveDayState(day)

            return (
              <Box
                key={day.key}
                role="gridcell"
                // ARIA grid pattern: selection lives on the gridcell — `aria-selected`
                // is not a supported attribute of the inner button.
                aria-selected={
                  day.isSelected || day.isRangeStart || day.isRangeEnd || day.isInRange
                    ? true
                    : undefined
                }
                className="p-0.5 text-center"
              >
                <Button
                  variant="unstyled"
                  size="none"
                  data-date={day.key}
                  aria-disabled={day.isDisabled || undefined}
                  aria-current={day.isToday ? 'date' : undefined}
                  tabIndex={isActive ? 0 : -1}
                  disabled={day.isDisabled}
                  className={dayVariants({ state, shape: dayShape })}
                  onMouseDown={(event) => {
                    if (!day.isDisabled) dayInteraction?.onDayMouseDown?.(day.date, event)
                  }}
                  onMouseEnter={() => {
                    if (!day.isDisabled) dayInteraction?.onDayMouseEnter?.(day.date)
                  }}
                  onClick={() => {
                    if (!day.isDisabled) {
                      selectDate(day.date)
                      setFocusedDate(day.date)
                    }
                  }}
                  onFocus={() => setFocusedDate(day.date)}
                  onKeyDown={(e) => handleDayKeyDown(e, day.date)}
                >
                  {day.date.getDate()}
                </Button>
              </Box>
            )
          })}
        </Box>
      ))}
    </div>
  )
}
