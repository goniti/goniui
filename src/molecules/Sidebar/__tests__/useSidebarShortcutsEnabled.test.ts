import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useSidebarShortcutsEnabled } from '../hooks/useSidebarShortcutsEnabled'

describe('useSidebarShortcutsEnabled', () => {
  it('is uncontrolled from defaultEnabled and updates its internal state', () => {
    const { result } = renderHook(() => useSidebarShortcutsEnabled(undefined, true))
    expect(result.current[0]).toBe(true)

    act(() => result.current[1](false))
    expect(result.current[0]).toBe(false)
  })

  it('respects a controlled value (no internal change) while still firing onEnabledChange', () => {
    const onEnabledChange = vi.fn()
    const { result } = renderHook(() => useSidebarShortcutsEnabled(true, true, onEnabledChange))

    act(() => result.current[1](false))
    expect(result.current[0]).toBe(true) // controlled — value owned by the parent
    expect(onEnabledChange).toHaveBeenCalledWith(false)
  })

  it('fires onEnabledChange in uncontrolled mode too', () => {
    const onEnabledChange = vi.fn()
    const { result } = renderHook(() =>
      useSidebarShortcutsEnabled(undefined, true, onEnabledChange)
    )

    act(() => result.current[1](false))
    expect(onEnabledChange).toHaveBeenCalledWith(false)
    expect(result.current[0]).toBe(false)
  })
})
