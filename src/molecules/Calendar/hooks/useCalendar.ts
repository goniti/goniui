'use client'

import { useCallback, useMemo, useState } from 'react'

import { isoDate, normalizeRangeBounds, sameDay, toMidnight } from '../lib/calendarUtils'

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isInRange: boolean
  /** ISO date YYYY-MM-DD — safe to use as React key. */
  key: string
}

export interface UseCalendarOptions {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date) => void
  locale?: string
  min?: Date
  max?: Date
  /** Range highlight — used by Agenda; selection handled externally via `onChange`. */
  rangeStart?: Date | null
  rangeEnd?: Date | null
  /** When set, pins the visible month (day 1). Pair with `onDisplayMonthChange` for controlled nav. */
  displayMonth?: Date
  onDisplayMonthChange?: (month: Date) => void
}

export function useCalendar({
  value: valueProp,
  defaultValue,
  onChange,
  locale = 'en-US',
  min,
  max,
  rangeStart,
  rangeEnd,
  displayMonth,
  onDisplayMonthChange,
}: UseCalendarOptions = {}) {
  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null)
  const value = isControlled ? (valueProp ?? null) : internalValue

  const isDisplayControlled = displayMonth !== undefined
  const [internalViewDate, setInternalViewDate] = useState<Date>(() => {
    const base = displayMonth ?? value ?? rangeStart ?? new Date()
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })
  const viewDate = useMemo(
    () =>
      isDisplayControlled
        ? new Date(displayMonth!.getFullYear(), displayMonth!.getMonth(), 1)
        : internalViewDate,
    [displayMonth, internalViewDate, isDisplayControlled]
  )

  const setViewDate = useCallback(
    (next: Date) => {
      const monthStart = new Date(next.getFullYear(), next.getMonth(), 1)
      if (isDisplayControlled) onDisplayMonthChange?.(monthStart)
      else setInternalViewDate(monthStart)
    },
    [isDisplayControlled, onDisplayMonthChange]
  )

  const [focusedDate, setFocusedDate] = useState<Date | null>(null)

  const viewYear = viewDate.getFullYear()
  const viewMonth = viewDate.getMonth()

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewDate),
    [locale, viewDate]
  )

  // Jan 7, 2024 is a Sunday — use as anchor for the Sunday-first weekday row.
  const weekdayLabels = useMemo<Array<{ short: string; long: string }>>(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const date = new Date(2024, 0, 7 + index)
        return {
          short: new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date),
          long: new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date),
        }
      }),
    [locale]
  )

  const weeks = useMemo<CalendarDay[][]>(() => {
    const today = toMidnight(new Date())
    const { lo, hi } = normalizeRangeBounds(rangeStart, rangeEnd)
    const firstDay = new Date(viewYear, viewMonth, 1)
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const startPad = firstDay.getDay()
    const totalCells = Math.ceil((startPad + daysInMonth) / 7) * 7

    const days: CalendarDay[] = Array.from({ length: totalCells }, (_, index) => {
      const date = new Date(viewYear, viewMonth, 1 - startPad + index)
      const midnight = toMidnight(date)
      const isRangeStart = lo != null && sameDay(midnight, lo)
      const isRangeEnd = hi != null && sameDay(midnight, hi)
      const isInRange =
        lo != null && hi != null && midnight >= lo && midnight <= hi && !isRangeStart && !isRangeEnd

      return {
        date: midnight,
        isCurrentMonth: date.getMonth() === viewMonth,
        isToday: sameDay(date, today),
        isSelected: value != null && sameDay(date, value),
        isDisabled:
          (min != null && midnight < toMidnight(min)) ||
          (max != null && midnight > toMidnight(max)),
        isRangeStart,
        isRangeEnd,
        isInRange,
        key: isoDate(date),
      }
    })

    return Array.from({ length: days.length / 7 }, (_, weekIndex) =>
      days.slice(weekIndex * 7, (weekIndex + 1) * 7)
    )
  }, [viewYear, viewMonth, value, min, max, rangeStart, rangeEnd])

  const viewMonthIndex = viewYear * 12 + viewMonth
  const isPrevMonthDisabled =
    min != null && viewMonthIndex <= min.getFullYear() * 12 + min.getMonth()
  const isNextMonthDisabled =
    max != null && viewMonthIndex >= max.getFullYear() * 12 + max.getMonth()

  const prevMonth = useCallback(() => {
    if (isPrevMonthDisabled) return
    setViewDate(new Date(viewYear, viewMonth - 1, 1))
    setFocusedDate(null)
  }, [isPrevMonthDisabled, setViewDate, viewMonth, viewYear])

  const nextMonth = useCallback(() => {
    if (isNextMonthDisabled) return
    setViewDate(new Date(viewYear, viewMonth + 1, 1))
    setFocusedDate(null)
  }, [isNextMonthDisabled, setViewDate, viewMonth, viewYear])

  const selectDate = useCallback(
    (date: Date) => {
      if (!isControlled) setInternalValue(date)
      onChange?.(date)
    },
    [isControlled, onChange]
  )

  const moveFocus = useCallback(
    (deltaValue: number, unit: 'day' | 'week' | 'month') => {
      const base = focusedDate ?? value ?? new Date(viewYear, viewMonth, 1)
      let next: Date
      if (unit === 'day') {
        next = new Date(base.getFullYear(), base.getMonth(), base.getDate() + deltaValue)
      } else if (unit === 'week') {
        next = new Date(base.getFullYear(), base.getMonth(), base.getDate() + deltaValue * 7)
      } else {
        next = new Date(base.getFullYear(), base.getMonth() + deltaValue, base.getDate())
      }
      setFocusedDate(next)
      if (next.getMonth() !== viewMonth || next.getFullYear() !== viewYear) {
        setViewDate(new Date(next.getFullYear(), next.getMonth(), 1))
      }
    },
    [focusedDate, setViewDate, value, viewMonth, viewYear]
  )

  return {
    weeks,
    viewYear,
    viewMonth,
    monthLabel,
    weekdayLabels,
    value,
    focusedDate,
    setFocusedDate,
    prevMonth,
    nextMonth,
    isPrevMonthDisabled,
    isNextMonthDisabled,
    selectDate,
    moveFocus,
  }
}
