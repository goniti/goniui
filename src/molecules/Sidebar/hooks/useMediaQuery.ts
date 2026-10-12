'use client'

import { useEffect, useState } from 'react'

/**
 * SSR-safe media-query match. Returns `false` on the server / first paint, then
 * syncs to the real value and updates on change. Use it to switch the desktop
 * rail for the mobile sheet (`useMediaQuery('(min-width: 768px)')`).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
