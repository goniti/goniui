'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

export interface CountdownTick {
  days: number
  hours: number
  minutes: number
  seconds: number
  /** `true` once the countdown has reached zero. The interval is cleared at that point. */
  isExpired: boolean
}

const SECONDS_IN_MINUTE = 60
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_DAY = 86400

function decompose(deltaMs: number): CountdownTick {
  if (deltaMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }

  const totalSeconds = Math.floor(deltaMs / 1000)
  return {
    days: Math.floor(totalSeconds / SECONDS_IN_DAY),
    hours: Math.floor((totalSeconds % SECONDS_IN_DAY) / SECONDS_IN_HOUR),
    minutes: Math.floor((totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE),
    seconds: totalSeconds % SECONDS_IN_MINUTE,
    isExpired: false,
  }
}

function resolveEndMs(target: Date | number): number {
  return target instanceof Date ? target.getTime() : Date.now() + target * 1000
}

/**
 * Tracks a countdown to a target time, ticking once per second.
 *
 * @param target - A future `Date` **or** the number of **seconds** remaining.
 *   Passing a `Date` anchors to an absolute wall-clock moment; passing a
 *   `number` treats it as a starting countdown value (useful in stories and
 *   tests driven by fake timers, since the end point is computed at mount).
 */
export function useCountdown(target: Date | number): CountdownTick {
  // Stable end-time anchor, recomputed only when target changes identity.
  const endMs = useMemo(() => resolveEndMs(target), [target])
  const endMsRef = useRef(endMs)
  endMsRef.current = endMs

  const [state, setState] = useState<CountdownTick>(() => decompose(endMs - Date.now()))

  useEffect(() => {
    // Snap immediately to the (possibly new) end time.
    setState(decompose(endMsRef.current - Date.now()))

    const id = setInterval(() => {
      const next = decompose(endMsRef.current - Date.now())
      setState(next)
      if (next.isExpired) clearInterval(id)
    }, 1000)

    return () => clearInterval(id)
  }, [endMs])

  return state
}
