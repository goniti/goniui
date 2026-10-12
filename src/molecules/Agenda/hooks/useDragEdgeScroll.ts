'use client'

import { type RefObject, useEffect, useRef, useState } from 'react'

const EDGE_PX = 36
/** One month per tick while dwelling — fixed cadence, not per-pixel, so a fast
 * drag near the edge advances steadily instead of jumping several months. */
const SHIFT_INTERVAL_MS = 650

export type EdgeDirection = 'prev' | 'next'

export interface UseDragEdgeScrollOptions {
  enabled: boolean
  gridRef: RefObject<HTMLDivElement | null>
  onShift: (delta: number) => void
}

/**
 * While a range drag is active, dwelling near a horizontal edge of the grid
 * advances the visible months one step per interval. Returns the active edge
 * direction so the caller can render a directional affordance.
 */
export function useDragEdgeScroll({
  enabled,
  gridRef,
  onShift,
}: UseDragEdgeScrollOptions): EdgeDirection | null {
  const [direction, setDirection] = useState<EdgeDirection | null>(null)
  const directionRef = useRef<EdgeDirection | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onShiftRef = useRef(onShift)
  onShiftRef.current = onShift

  useEffect(() => {
    function stop() {
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    function setEdge(next: EdgeDirection | null) {
      if (next === directionRef.current) return
      directionRef.current = next
      setDirection(next)
      stop()
      if (next != null) {
        const delta = next === 'prev' ? -1 : 1
        intervalRef.current = setInterval(() => onShiftRef.current(delta), SHIFT_INTERVAL_MS)
      }
    }

    if (!enabled) {
      setEdge(null)
      return
    }

    function handleMove(event: MouseEvent) {
      const rect = gridRef.current?.getBoundingClientRect()
      if (rect == null) return
      if (event.clientX < rect.left + EDGE_PX) setEdge('prev')
      else if (event.clientX > rect.right - EDGE_PX) setEdge('next')
      else setEdge(null)
    }

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      setEdge(null)
    }
  }, [enabled, gridRef])

  return direction
}
