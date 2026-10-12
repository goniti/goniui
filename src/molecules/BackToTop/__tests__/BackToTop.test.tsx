import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { BackToTop } from '../components/BackToTop'

function setScroll(y: number): void {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
  act(() => {
    fireEvent.scroll(window)
    // The listener is rAF-throttled — flush the queued frame.
    vi.advanceTimersByTime(20)
  })
}

describe('BackToTop', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal(
      'requestAnimationFrame',
      (callback: FrameRequestCallback) => setTimeout(() => callback(0), 16) as unknown as number
    )
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id))
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
    window.matchMedia = vi.fn().mockReturnValue({ matches: false })
    window.scrollTo = vi.fn()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('is hidden before the scroll threshold and appears after it', () => {
    render(<BackToTop label="Back to top" />)
    expect(screen.queryByRole('button', { name: 'Back to top' })).toBeNull()

    setScroll(800 * 1.5 + 1)

    expect(screen.getByRole('button', { name: 'Back to top' })).toBeDefined()
  })

  it('disappears again when scrolling back up', () => {
    render(<BackToTop label="Back to top" />)
    setScroll(2000)
    setScroll(0)

    expect(screen.queryByRole('button', { name: 'Back to top' })).toBeNull()
  })

  it('smooth-scrolls to the top on click', () => {
    render(<BackToTop label="Back to top" />)
    setScroll(2000)

    fireEvent.click(screen.getByRole('button', { name: 'Back to top' }))

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('scrolls instantly when the user prefers reduced motion', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })
    render(<BackToTop label="Back to top" />)
    setScroll(2000)

    fireEvent.click(screen.getByRole('button', { name: 'Back to top' }))

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('honours a custom threshold', () => {
    render(<BackToTop label="Back to top" thresholdViewports={0.5} />)
    setScroll(500)

    expect(screen.getByRole('button', { name: 'Back to top' })).toBeDefined()
  })
})
