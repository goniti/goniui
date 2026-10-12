import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useMediaQuery } from '../hooks/useMediaQuery'

function mockMatchMedia(initial: boolean) {
  const listeners = new Set<(event: { matches: boolean }) => void>()
  const mql = {
    matches: initial,
    media: '',
    addEventListener: (_: string, cb: (event: { matches: boolean }) => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: (event: { matches: boolean }) => void) =>
      listeners.delete(cb),
    change(matches: boolean) {
      mql.matches = matches
      listeners.forEach((cb) => cb({ matches }))
    },
  }
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => mql)
  )
  return mql
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useMediaQuery', () => {
  it('reflects the initial match', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('updates when the media query changes', () => {
    const mql = mockMatchMedia(false)
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
    act(() => mql.change(true))
    expect(result.current).toBe(true)
  })
})
