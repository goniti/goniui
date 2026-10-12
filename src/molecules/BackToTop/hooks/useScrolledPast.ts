'use client'

import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled past `viewports` × the viewport height.
 * rAF-throttled so the scroll listener never causes jank.
 */
export function useScrolledPast(viewports: number): boolean {
  const [hasScrolledPast, setHasScrolledPast] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setHasScrolledPast(window.scrollY > window.innerHeight * viewports)
    }
    const handleScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [viewports])

  return hasScrolledPast
}
