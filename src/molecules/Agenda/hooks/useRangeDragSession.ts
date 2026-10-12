'use client'

import { type MouseEvent as ReactMouseEvent, useCallback, useRef } from 'react'

import { useWindowEvent } from './useWindowEvent'

const DRAG_THRESHOLD_PX = 5

export interface UseRangeDragSessionOptions {
  enabled: boolean
  beginDrag: (date: Date) => void
  updateDrag: (date: Date) => void
  endDrag: () => void
}

interface PendingDrag {
  date: Date
  x: number
  y: number
}

/**
 * Defers range drag until the pointer moves past a small threshold so simple
 * clicks keep a stable preview and do not flash a one-day drag range.
 */
export function useRangeDragSession({
  enabled,
  beginDrag,
  updateDrag,
  endDrag,
}: UseRangeDragSessionOptions) {
  const pendingRef = useRef<PendingDrag | null>(null)
  const activeRef = useRef(false)

  const resetSession = useCallback(() => {
    pendingRef.current = null
    activeRef.current = false
  }, [])

  const handleMouseMove = useCallback(
    (event: globalThis.MouseEvent) => {
      const pending = pendingRef.current
      if (pending == null || activeRef.current) return

      const distance = Math.hypot(event.clientX - pending.x, event.clientY - pending.y)
      if (distance < DRAG_THRESHOLD_PX) return

      activeRef.current = true
      beginDrag(pending.date)
      updateDrag(pending.date)
    },
    [beginDrag, updateDrag]
  )

  const handleMouseUp = useCallback(() => {
    if (activeRef.current) endDrag()
    resetSession()
  }, [endDrag, resetSession])

  useWindowEvent('mousemove', handleMouseMove, enabled)
  useWindowEvent('mouseup', handleMouseUp, enabled)

  const onDayMouseDown = useCallback(
    (date: Date, event: ReactMouseEvent) => {
      if (!enabled || event.button !== 0) return
      pendingRef.current = { date, x: event.clientX, y: event.clientY }
      activeRef.current = false
    },
    [enabled]
  )

  const onDayMouseEnter = useCallback(
    (date: Date) => {
      if (activeRef.current) updateDrag(date)
    },
    [updateDrag]
  )

  return { onDayMouseDown, onDayMouseEnter }
}
