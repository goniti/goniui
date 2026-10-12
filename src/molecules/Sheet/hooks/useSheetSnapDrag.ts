'use client'

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

/** Below this fraction of the smallest snap point, releasing the drag closes the sheet. */
const CLOSE_THRESHOLD_RATIO = 0.5

export interface UseSheetSnapDragOptions {
  /** Heights (vh %) the handle can drag/snap to — order doesn't matter, sorted internally. */
  snapPoints: number[]
  /** Called once when a drag is released below the close threshold. */
  onClose: () => void
}

export interface UseSheetSnapDragResult {
  /** Current resting/dragging height, as a vh percentage. */
  heightPercent: number
  /** True while actively dragging — callers disable the height CSS transition while this is set. */
  isDragging: boolean
  onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void
  onPointerUp: (event: ReactPointerEvent<HTMLElement>) => void
  onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => void
  /** Spread onto the drag handle to expose it as a slider for assistive tech. */
  sliderProps: {
    role: 'slider'
    tabIndex: number
    'aria-orientation': 'vertical'
    'aria-valuemin': number
    'aria-valuemax': number
    'aria-valuenow': number
  }
}

/**
 * Drives a draggable handle that resizes a panel between discrete `snapPoints`
 * (vh %), snapping to the closest one on release — or closing when dragged
 * below half the smallest point. Pointer capture keeps the drag tracking the
 * handle even once the pointer moves outside its hit area.
 */
export function useSheetSnapDrag({
  snapPoints,
  onClose,
}: UseSheetSnapDragOptions): UseSheetSnapDragResult {
  const sortedPoints = useMemo(() => [...snapPoints].sort((a, b) => a - b), [snapPoints])
  const smallest = sortedPoints[0] ?? 0
  const largest = sortedPoints[sortedPoints.length - 1] ?? 0

  const [heightPercent, setHeightPercent] = useState(largest)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ clientY: 0, heightPercent: largest })

  const resolveSnap = useCallback(
    (percent: number) => {
      if (sortedPoints.length === 0) return percent
      if (percent < smallest * CLOSE_THRESHOLD_RATIO) {
        onClose()
        return smallest
      }
      return sortedPoints.reduce((closest, point) =>
        Math.abs(point - percent) < Math.abs(closest - percent) ? point : closest
      )
    },
    [sortedPoints, smallest, onClose]
  )

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (sortedPoints.length === 0) return
      // Optional chaining: jsdom (unit tests) doesn't implement pointer capture.
      event.currentTarget.setPointerCapture?.(event.pointerId)
      dragStart.current = { clientY: event.clientY, heightPercent }
      setIsDragging(true)
    },
    [sortedPoints, heightPercent]
  )

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!isDragging) return
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight
      const deltaPercent = ((dragStart.current.clientY - event.clientY) / viewportHeight) * 100
      setHeightPercent(Math.min(100, Math.max(0, dragStart.current.heightPercent + deltaPercent)))
    },
    [isDragging]
  )

  const onPointerUp = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    setHeightPercent((current) => resolveSnap(current))
  }, [isDragging, resolveSnap])

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      if (sortedPoints.length === 0) return
      const currentIndex = sortedPoints.indexOf(heightPercent)
      const stepTo = (index: number) => {
        event.preventDefault()
        setHeightPercent(sortedPoints[Math.min(sortedPoints.length - 1, Math.max(0, index))])
      }
      const fallbackIndex = currentIndex === -1 ? 0 : currentIndex
      if (event.key === 'ArrowUp' || event.key === 'ArrowRight') stepTo(fallbackIndex + 1)
      else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') stepTo(fallbackIndex - 1)
      else if (event.key === 'Home') stepTo(0)
      else if (event.key === 'End') stepTo(sortedPoints.length - 1)
    },
    [sortedPoints, heightPercent]
  )

  return {
    heightPercent,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onKeyDown,
    sliderProps: {
      role: 'slider',
      tabIndex: 0,
      'aria-orientation': 'vertical',
      'aria-valuemin': smallest,
      'aria-valuemax': largest,
      'aria-valuenow': Math.round(heightPercent),
    },
  }
}
