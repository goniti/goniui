import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useSidebarMode } from '../hooks/useSidebarMode'

describe('useSidebarMode', () => {
  it('is uncontrolled from defaultMode and updates its internal state', () => {
    const { result } = renderHook(() => useSidebarMode(undefined, 'collapsed'))
    expect(result.current[0]).toBe('collapsed')

    act(() => result.current[1]('hover'))
    expect(result.current[0]).toBe('hover')
  })

  it('respects a controlled mode (no internal change) while still firing onModeChange', () => {
    const onModeChange = vi.fn()
    const { result } = renderHook(() => useSidebarMode('expanded', 'expanded', onModeChange))

    act(() => result.current[1]('collapsed'))
    expect(result.current[0]).toBe('expanded') // controlled — value owned by the parent
    expect(onModeChange).toHaveBeenCalledWith('collapsed')
  })

  it('fires onModeChange in uncontrolled mode too', () => {
    const onModeChange = vi.fn()
    const { result } = renderHook(() => useSidebarMode(undefined, 'expanded', onModeChange))

    act(() => result.current[1]('hover'))
    expect(onModeChange).toHaveBeenCalledWith('hover')
    expect(result.current[0]).toBe('hover')
  })
})
