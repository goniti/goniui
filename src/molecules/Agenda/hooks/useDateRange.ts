'use client'

import { useCallback, useMemo, useState } from 'react'

import { sameDay, toMidnight } from '@/molecules/Calendar/lib/calendarUtils'

export interface DateRangeValue {
  start: Date | null
  end: Date | null
}

export interface UseDateRangeOptions {
  start?: Date | null
  end?: Date | null
  defaultStart?: Date | null
  defaultEnd?: Date | null
  onRangeChange?: (range: DateRangeValue) => void
}

function orderRange(start: Date, end: Date): DateRangeValue {
  const a = toMidnight(start)
  const b = toMidnight(end)
  return a <= b ? { start: a, end: b } : { start: b, end: a }
}

/**
 * Anchor a drag against the *opposite* endpoint when grabbing an existing
 * cursor — so dragging the start cursor moves the start and pins the end (and
 * vice-versa). Grabbing anywhere else starts a fresh range at that day.
 */
function resolveDragAnchor(picked: Date, start: Date | null, end: Date | null): Date {
  if (start != null && end != null) {
    if (sameDay(picked, start)) return end
    if (sameDay(picked, end)) return start
  }
  return picked
}

/**
 * Range selection state — click (start → end) or drag across days.
 * Third click starts a new range.
 */
export function useDateRange({
  start: startProp,
  end: endProp,
  defaultStart,
  defaultEnd,
  onRangeChange,
}: UseDateRangeOptions = {}) {
  const isStartControlled = startProp !== undefined
  const isEndControlled = endProp !== undefined
  const [internalStart, setInternalStart] = useState<Date | null>(defaultStart ?? null)
  const [internalEnd, setInternalEnd] = useState<Date | null>(defaultEnd ?? null)

  const start = isStartControlled ? (startProp ?? null) : internalStart
  const end = isEndControlled ? (endProp ?? null) : internalEnd

  const [dragAnchor, setDragAnchor] = useState<Date | null>(null)
  const [dragFocus, setDragFocus] = useState<Date | null>(null)
  const [didDrag, setDidDrag] = useState(false)

  const isDragging = dragAnchor != null

  const setRange = useCallback(
    (next: DateRangeValue) => {
      if (!isStartControlled) setInternalStart(next.start)
      if (!isEndControlled) setInternalEnd(next.end)
      onRangeChange?.(next)
    },
    [isEndControlled, isStartControlled, onRangeChange]
  )

  const displayRange = useMemo<DateRangeValue>(() => {
    if (isDragging && dragAnchor != null && dragFocus != null) {
      return orderRange(dragAnchor, dragFocus)
    }
    return { start, end }
  }, [dragAnchor, dragFocus, end, isDragging, start])

  const selectDate = useCallback(
    (date: Date) => {
      const picked = toMidnight(date)

      if (start != null && end == null && sameDay(picked, start)) {
        setRange({ start: null, end: null })
        return
      }

      if (start == null || end != null) {
        setRange({ start: picked, end: null })
        return
      }

      setRange(orderRange(start, picked))
    },
    [end, setRange, start]
  )

  const beginDrag = useCallback(
    (date: Date) => {
      const picked = toMidnight(date)
      setDragAnchor(resolveDragAnchor(picked, start, end))
      setDragFocus(picked)
      setDidDrag(false)
    },
    [end, start]
  )

  const updateDrag = useCallback(
    (date: Date) => {
      if (dragAnchor == null) return
      const picked = toMidnight(date)
      if (picked.getTime() !== dragFocus?.getTime()) setDidDrag(true)
      setDragFocus(picked)
    },
    [dragAnchor, dragFocus]
  )

  const endDrag = useCallback(() => {
    if (dragAnchor != null && dragFocus != null) {
      setRange(orderRange(dragAnchor, dragFocus))
    }
    setDragAnchor(null)
    setDragFocus(null)
  }, [dragAnchor, dragFocus, setRange])

  const handleDaySelect = useCallback(
    (date: Date) => {
      if (didDrag) {
        setDidDrag(false)
        return
      }
      selectDate(date)
    },
    [didDrag, selectDate]
  )

  return {
    start,
    end,
    displayStart: displayRange.start,
    displayEnd: displayRange.end,
    selectDate: handleDaySelect,
    setRange,
    beginDrag,
    updateDrag,
    endDrag,
    isDragging,
  }
}
