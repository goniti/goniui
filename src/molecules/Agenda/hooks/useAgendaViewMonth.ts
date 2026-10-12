'use client'

import { useCallback, useEffect, useState } from 'react'

function monthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1)
}

/** Slide the two-month window so it stays within the temporal bounds. */
function clampWindow(
  window: { left: Date; right: Date },
  min?: Date,
  max?: Date
): { left: Date; right: Date } {
  if (max != null && window.right > monthStart(max)) {
    const right = monthStart(max)
    return { left: addMonths(right, -1), right }
  }
  if (min != null && window.left < monthStart(min)) {
    const left = monthStart(min)
    return { left, right: addMonths(left, 1) }
  }
  return window
}

/**
 * Anchor months for the two calendars: left = the range start, right = the range
 * end (so both endpoints are visible). When there is no distinct, later end the
 * right calendar falls back to the month after the left. The window is then
 * clamped so neither calendar shows a month outside the temporal bounds.
 */
function resolveAnchorMonths(
  start: Date | null,
  end: Date | null,
  min?: Date,
  max?: Date
): { left: Date; right: Date } {
  const left = monthStart(start ?? end ?? new Date())
  const endMonth = end != null ? monthStart(end) : null
  const right = endMonth != null && endMonth > left ? endMonth : addMonths(left, 1)
  return clampWindow({ left, right }, min, max)
}

export interface UseAgendaViewMonthOptions {
  start: Date | null
  end: Date | null
  min?: Date
  max?: Date
  /** Bumped when the calendar popover opens — re-anchors both visible months. */
  resetKey?: number
}

/**
 * Two independent visible months for the agenda grid. The left and right
 * calendars navigate separately — shifting one never moves the other. Both
 * re-anchor (left = start month, right = end month) only when `resetKey` changes
 * (popover open / preset jump), never on a plain selection change.
 */
export function useAgendaViewMonth({
  start,
  end,
  min,
  max,
  resetKey = 0,
}: UseAgendaViewMonthOptions) {
  const [leftMonth, setLeftMonth] = useState(() => resolveAnchorMonths(start, end, min, max).left)
  const [rightMonth, setRightMonth] = useState(
    () => resolveAnchorMonths(start, end, min, max).right
  )

  useEffect(() => {
    const { left, right } = resolveAnchorMonths(start, end, min, max)
    setLeftMonth(left)
    setRightMonth(right)
    // Only re-anchor when the popover opens (`resetKey`), not on each selection change.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [resetKey])

  const shiftLeft = useCallback((delta: number) => {
    setLeftMonth((month) => addMonths(month, delta))
  }, [])

  const shiftRight = useCallback((delta: number) => {
    setRightMonth((month) => addMonths(month, delta))
  }, [])

  const goLeft = useCallback((month: Date) => setLeftMonth(monthStart(month)), [])
  const goRight = useCallback((month: Date) => setRightMonth(monthStart(month)), [])

  return { leftMonth, rightMonth, shiftLeft, shiftRight, goLeft, goRight }
}
