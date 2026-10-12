import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useAgendaViewMonth } from '../hooks/useAgendaViewMonth'

afterEach(() => vi.useRealTimers())

describe('useAgendaViewMonth', () => {
  it('initializes the left month from the anchor and the right month after it', () => {
    const { result } = renderHook(() =>
      useAgendaViewMonth({ start: new Date(2026, 6, 5), end: null, resetKey: 0 })
    )

    expect(result.current.leftMonth).toEqual(new Date(2026, 6, 1))
    expect(result.current.rightMonth).toEqual(new Date(2026, 7, 1))
  })

  it('anchors the right month to the range end when it is in a later month', () => {
    const { result } = renderHook(() =>
      useAgendaViewMonth({ start: new Date(2026, 0, 1), end: new Date(2026, 5, 11), resetKey: 0 })
    )

    expect(result.current.leftMonth).toEqual(new Date(2026, 0, 1))
    expect(result.current.rightMonth).toEqual(new Date(2026, 5, 1))
  })

  it('falls back to start+1 when the end is in the same month as the start', () => {
    const { result } = renderHook(() =>
      useAgendaViewMonth({ start: new Date(2026, 0, 1), end: new Date(2026, 0, 20), resetKey: 0 })
    )

    expect(result.current.leftMonth).toEqual(new Date(2026, 0, 1))
    expect(result.current.rightMonth).toEqual(new Date(2026, 1, 1))
  })

  it('shifts the right month independently of the left', () => {
    const { result } = renderHook(() =>
      useAgendaViewMonth({ start: new Date(2026, 6, 5), end: null, resetKey: 1 })
    )

    act(() => result.current.shiftRight(1))

    expect(result.current.leftMonth).toEqual(new Date(2026, 6, 1))
    expect(result.current.rightMonth).toEqual(new Date(2026, 8, 1))
  })

  it('shifts the left month independently of the right', () => {
    const { result } = renderHook(() =>
      useAgendaViewMonth({ start: new Date(2026, 6, 5), end: null, resetKey: 1 })
    )

    act(() => result.current.shiftLeft(-1))

    expect(result.current.leftMonth).toEqual(new Date(2026, 5, 1))
    expect(result.current.rightMonth).toEqual(new Date(2026, 7, 1))
  })

  it('does not follow selection changes while open', () => {
    const { result, rerender } = renderHook(
      ({ start, end }) => useAgendaViewMonth({ start, end, resetKey: 1 }),
      {
        initialProps: {
          start: new Date(2026, 6, 5) as Date | null,
          end: null as Date | null,
        },
      }
    )

    act(() => result.current.shiftRight(1))
    expect(result.current.rightMonth).toEqual(new Date(2026, 8, 1))

    rerender({ start: new Date(2026, 8, 3), end: null })
    expect(result.current.leftMonth).toEqual(new Date(2026, 6, 1))
    expect(result.current.rightMonth).toEqual(new Date(2026, 8, 1))
  })

  it('re-anchors both months when resetKey changes', () => {
    const { result, rerender } = renderHook(
      ({ resetKey }) => useAgendaViewMonth({ start: new Date(2026, 8, 10), end: null, resetKey }),
      { initialProps: { resetKey: 1 } }
    )

    expect(result.current.leftMonth).toEqual(new Date(2026, 8, 1))

    act(() => result.current.shiftLeft(-2))
    expect(result.current.leftMonth).toEqual(new Date(2026, 6, 1))

    rerender({ resetKey: 2 })
    expect(result.current.leftMonth).toEqual(new Date(2026, 8, 1))
    expect(result.current.rightMonth).toEqual(new Date(2026, 9, 1))
  })

  it('clamps the default window to the max bound (no future month in past mode)', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 5, 11, 12, 0, 0))

    const { result } = renderHook(() =>
      useAgendaViewMonth({ start: null, end: null, max: new Date(2026, 5, 11), resetKey: 0 })
    )

    // Default June/July would show a future month — slide back to May/June.
    expect(result.current.leftMonth).toEqual(new Date(2026, 4, 1))
    expect(result.current.rightMonth).toEqual(new Date(2026, 5, 1))
  })

  it('keeps the default window at the min bound (future mode)', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 5, 11, 12, 0, 0))

    const { result } = renderHook(() =>
      useAgendaViewMonth({ start: null, end: null, min: new Date(2026, 5, 11), resetKey: 0 })
    )

    expect(result.current.leftMonth).toEqual(new Date(2026, 5, 1))
    expect(result.current.rightMonth).toEqual(new Date(2026, 6, 1))
  })
})
