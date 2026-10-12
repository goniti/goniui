import { act, renderHook } from '@testing-library/react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useRangeDragSession } from '../hooks/useRangeDragSession'

describe('useRangeDragSession UX regression', () => {
  it('does not start a drag until the pointer moves past the threshold', () => {
    const beginDrag = vi.fn()
    const updateDrag = vi.fn()
    const endDrag = vi.fn()

    const { result } = renderHook(() =>
      useRangeDragSession({
        enabled: true,
        beginDrag,
        updateDrag,
        endDrag,
      })
    )

    act(() => {
      result.current.onDayMouseDown(new Date(2026, 6, 20), {
        button: 0,
        clientX: 10,
        clientY: 10,
      } as unknown as ReactMouseEvent)
    })

    act(() => {
      window.dispatchEvent(new MouseEvent('mouseup'))
    })

    expect(beginDrag).not.toHaveBeenCalled()
    expect(endDrag).not.toHaveBeenCalled()
  })

  it('starts and ends a drag after crossing the movement threshold', () => {
    const beginDrag = vi.fn()
    const updateDrag = vi.fn()
    const endDrag = vi.fn()

    const { result } = renderHook(() =>
      useRangeDragSession({
        enabled: true,
        beginDrag,
        updateDrag,
        endDrag,
      })
    )

    const anchor = new Date(2026, 7, 3)
    const target = new Date(2026, 7, 11)

    act(() => {
      result.current.onDayMouseDown(anchor, {
        button: 0,
        clientX: 10,
        clientY: 10,
      } as unknown as ReactMouseEvent)
    })

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 30, clientY: 10 }))
    })

    act(() => {
      result.current.onDayMouseEnter(target)
    })

    act(() => {
      window.dispatchEvent(new MouseEvent('mouseup'))
    })

    expect(beginDrag).toHaveBeenCalledWith(anchor)
    expect(updateDrag).toHaveBeenCalledWith(target)
    expect(endDrag).toHaveBeenCalledTimes(1)
  })

  it('ignores mousedown when disabled', () => {
    const beginDrag = vi.fn()
    const { result } = renderHook(() =>
      useRangeDragSession({ enabled: false, beginDrag, updateDrag: vi.fn(), endDrag: vi.fn() })
    )

    act(() => {
      result.current.onDayMouseDown(new Date(2026, 6, 20), {
        button: 0,
        clientX: 10,
        clientY: 10,
      } as unknown as ReactMouseEvent)
    })
    act(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: 40, clientY: 10 })))

    expect(beginDrag).not.toHaveBeenCalled()
  })

  it('ignores non-primary mouse buttons', () => {
    const beginDrag = vi.fn()
    const { result } = renderHook(() =>
      useRangeDragSession({ enabled: true, beginDrag, updateDrag: vi.fn(), endDrag: vi.fn() })
    )

    act(() => {
      result.current.onDayMouseDown(new Date(2026, 6, 20), {
        button: 2,
        clientX: 10,
        clientY: 10,
      } as unknown as ReactMouseEvent)
    })
    act(() => window.dispatchEvent(new MouseEvent('mousemove', { clientX: 40, clientY: 10 })))

    expect(beginDrag).not.toHaveBeenCalled()
  })
})
