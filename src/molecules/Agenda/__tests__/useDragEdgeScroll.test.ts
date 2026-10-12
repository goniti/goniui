import { act, renderHook } from '@testing-library/react'
import type { RefObject } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useDragEdgeScroll } from '../hooks/useDragEdgeScroll'

function gridRefAt(left: number, right: number): RefObject<HTMLDivElement> {
  return {
    current: {
      getBoundingClientRect: () =>
        ({
          left,
          right,
          top: 0,
          bottom: 0,
          width: right - left,
          height: 0,
          x: left,
          y: 0,
        }) as DOMRect,
    } as HTMLDivElement,
  }
}

function moveTo(clientX: number) {
  window.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY: 10 }))
}

describe('useDragEdgeScroll', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('shifts exactly one month per interval while dwelling near the right edge', () => {
    const onShift = vi.fn()
    const gridRef = gridRefAt(100, 300)

    const { result } = renderHook(() => useDragEdgeScroll({ enabled: true, gridRef, onShift }))

    act(() => moveTo(295))
    expect(result.current).toBe('next')
    expect(onShift).not.toHaveBeenCalled()

    act(() => vi.advanceTimersByTime(650))
    expect(onShift).toHaveBeenCalledTimes(1)
    expect(onShift).toHaveBeenLastCalledWith(1)

    act(() => vi.advanceTimersByTime(650))
    expect(onShift).toHaveBeenCalledTimes(2)
  })

  it('does not shift while the pointer stays in the middle', () => {
    const onShift = vi.fn()
    const gridRef = gridRefAt(100, 300)

    const { result } = renderHook(() => useDragEdgeScroll({ enabled: true, gridRef, onShift }))

    act(() => moveTo(200))
    expect(result.current).toBeNull()

    act(() => vi.advanceTimersByTime(2000))
    expect(onShift).not.toHaveBeenCalled()
  })

  it('reports the left direction and shifts backwards near the left edge', () => {
    const onShift = vi.fn()
    const gridRef = gridRefAt(100, 300)

    const { result } = renderHook(() => useDragEdgeScroll({ enabled: true, gridRef, onShift }))

    act(() => moveTo(110))
    expect(result.current).toBe('prev')

    act(() => vi.advanceTimersByTime(650))
    expect(onShift).toHaveBeenLastCalledWith(-1)
  })

  it('stops shifting when the pointer returns to the middle', () => {
    const onShift = vi.fn()
    const gridRef = gridRefAt(100, 300)

    const { result } = renderHook(() => useDragEdgeScroll({ enabled: true, gridRef, onShift }))

    act(() => moveTo(295))
    act(() => vi.advanceTimersByTime(650))
    expect(onShift).toHaveBeenCalledTimes(1)

    act(() => moveTo(200))
    expect(result.current).toBeNull()
    act(() => vi.advanceTimersByTime(2000))
    expect(onShift).toHaveBeenCalledTimes(1)
  })

  it('switches direction and delta when moving from the left edge to the right edge', () => {
    const onShift = vi.fn()
    const gridRef = gridRefAt(100, 300)

    const { result } = renderHook(() => useDragEdgeScroll({ enabled: true, gridRef, onShift }))

    act(() => moveTo(110))
    expect(result.current).toBe('prev')
    act(() => vi.advanceTimersByTime(650))
    expect(onShift).toHaveBeenLastCalledWith(-1)

    act(() => moveTo(295))
    expect(result.current).toBe('next')
    act(() => vi.advanceTimersByTime(650))
    expect(onShift).toHaveBeenLastCalledWith(1)
  })

  it('stops shifting once the drag ends', () => {
    const onShift = vi.fn()
    const gridRef = gridRefAt(100, 300)

    const { result, rerender } = renderHook(
      ({ enabled }) => useDragEdgeScroll({ enabled, gridRef, onShift }),
      { initialProps: { enabled: true } }
    )

    act(() => moveTo(295))
    act(() => vi.advanceTimersByTime(650))
    expect(onShift).toHaveBeenCalledTimes(1)

    rerender({ enabled: false })
    expect(result.current).toBeNull()

    act(() => vi.advanceTimersByTime(2000))
    expect(onShift).toHaveBeenCalledTimes(1)
  })
})
