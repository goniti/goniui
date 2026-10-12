import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useDateRange } from '../hooks/useDateRange'

describe('useDateRange', () => {
  it('sets start on first selection', () => {
    const onRangeChange = vi.fn()
    const { result } = renderHook(() => useDateRange({ onRangeChange }))

    act(() => result.current.selectDate(new Date(2024, 5, 10)))

    expect(result.current.start).toEqual(new Date(2024, 5, 10))
    expect(result.current.end).toBeNull()
    expect(onRangeChange).toHaveBeenCalledWith({
      start: new Date(2024, 5, 10),
      end: null,
    })
  })

  it('sets end on second selection and orders chronologically', () => {
    const onRangeChange = vi.fn()
    const { result } = renderHook(() =>
      useDateRange({ start: new Date(2024, 5, 15), end: null, onRangeChange })
    )

    act(() => result.current.selectDate(new Date(2024, 5, 10)))

    expect(onRangeChange).toHaveBeenCalledWith({
      start: new Date(2024, 5, 10),
      end: new Date(2024, 5, 15),
    })
  })

  it('clears the start when clicking the only selected date', () => {
    const { result } = renderHook(() => useDateRange())

    act(() => result.current.selectDate(new Date(2024, 5, 10)))
    act(() => result.current.selectDate(new Date(2024, 5, 10)))

    expect(result.current.start).toBeNull()
    expect(result.current.end).toBeNull()
  })

  it('starts a new range when both ends are already set', () => {
    const { result } = renderHook(() => useDateRange())

    act(() => result.current.selectDate(new Date(2024, 5, 1)))
    act(() => result.current.selectDate(new Date(2024, 5, 20)))
    act(() => result.current.selectDate(new Date(2024, 5, 12)))

    expect(result.current.start).toEqual(new Date(2024, 5, 12))
    expect(result.current.end).toBeNull()
  })

  it('moves the start cursor and keeps the end when dragging the start endpoint', () => {
    const onRangeChange = vi.fn()
    const { result } = renderHook(() =>
      useDateRange({
        start: new Date(2024, 5, 14),
        end: new Date(2024, 5, 18),
        onRangeChange,
      })
    )

    act(() => result.current.beginDrag(new Date(2024, 5, 14)))
    act(() => result.current.updateDrag(new Date(2024, 5, 15)))
    act(() => result.current.endDrag())

    expect(onRangeChange).toHaveBeenLastCalledWith({
      start: new Date(2024, 5, 15),
      end: new Date(2024, 5, 18),
    })
  })

  it('swaps the endpoints when the dragged start cursor crosses the end', () => {
    const onRangeChange = vi.fn()
    const { result } = renderHook(() =>
      useDateRange({
        start: new Date(2024, 5, 14),
        end: new Date(2024, 5, 18),
        onRangeChange,
      })
    )

    act(() => result.current.beginDrag(new Date(2024, 5, 14)))
    act(() => result.current.updateDrag(new Date(2024, 5, 20)))
    act(() => result.current.endDrag())

    expect(onRangeChange).toHaveBeenLastCalledWith({
      start: new Date(2024, 5, 18),
      end: new Date(2024, 5, 20),
    })
  })

  it('moves the end cursor and keeps the start when dragging the end endpoint', () => {
    const onRangeChange = vi.fn()
    const { result } = renderHook(() =>
      useDateRange({
        start: new Date(2024, 5, 14),
        end: new Date(2024, 5, 18),
        onRangeChange,
      })
    )

    act(() => result.current.beginDrag(new Date(2024, 5, 18)))
    act(() => result.current.updateDrag(new Date(2024, 5, 16)))
    act(() => result.current.endDrag())

    expect(onRangeChange).toHaveBeenLastCalledWith({
      start: new Date(2024, 5, 14),
      end: new Date(2024, 5, 16),
    })
  })
})
