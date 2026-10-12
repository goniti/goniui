'use client'

import { useEffect } from 'react'

type WindowEventMap = {
  mouseup: MouseEvent
  mousemove: MouseEvent
  mousedown: MouseEvent
  pointerup: PointerEvent
  pointermove: PointerEvent
}

/** Subscribe to a window event with automatic cleanup on unmount or dep change. */
export function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return
    const handler = listener as (event: Event) => void
    window.addEventListener(type, handler)
    return () => window.removeEventListener(type, handler)
  }, [enabled, listener, type])
}
