import { describe, expect, it, vi } from 'vitest'

import { resolveTemporalBounds, startOfToday } from './resolveTemporalBounds'

describe('startOfToday', () => {
  it('returns midnight local time for the current day', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 5, 15, 14, 30, 0))

    const today = startOfToday()
    expect(today.getFullYear()).toBe(2024)
    expect(today.getMonth()).toBe(5)
    expect(today.getDate()).toBe(15)
    expect(today.getHours()).toBe(0)
    expect(today.getMinutes()).toBe(0)

    vi.useRealTimers()
  })
})

describe('resolveTemporalBounds', () => {
  const today = new Date(2024, 5, 15)

  it('returns overrides only for present', () => {
    const min = new Date(2024, 0, 1)
    const max = new Date(2024, 11, 31)
    expect(resolveTemporalBounds('present', { min, max })).toEqual({ min, max })
  })

  it('returns overrides only when temporal is undefined', () => {
    const min = new Date(2024, 0, 1)
    expect(resolveTemporalBounds(undefined, { min })).toEqual({ min, max: undefined })
  })

  it('caps max at today for past', () => {
    vi.useFakeTimers()
    vi.setSystemTime(today)

    expect(resolveTemporalBounds('past', {})).toEqual({ min: undefined, max: today })

    const earlierMax = new Date(2024, 5, 10)
    expect(resolveTemporalBounds('past', { max: earlierMax })).toEqual({
      min: undefined,
      max: earlierMax,
    })

    vi.useRealTimers()
  })

  it('floors min at today for future', () => {
    vi.useFakeTimers()
    vi.setSystemTime(today)

    expect(resolveTemporalBounds('future', {})).toEqual({ min: today, max: undefined })

    const laterMin = new Date(2024, 5, 20)
    expect(resolveTemporalBounds('future', { min: laterMin })).toEqual({
      min: laterMin,
      max: undefined,
    })

    vi.useRealTimers()
  })
})
