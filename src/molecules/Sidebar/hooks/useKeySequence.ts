'use client'

import { useEffect, useRef } from 'react'

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

function isWithinDialog(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return Boolean(target.closest('[role="dialog"], [role="alertdialog"]'))
}

export interface UseKeySequenceOptions {
  /** Idle time (ms) after which a partial sequence resets. Default 1000. */
  resetMs?: number
}

/**
 * Fires `onMatch` when the user types `sequence` (ordered single-char keys, e.g.
 * `['g', 'b']`) on the document. Ignores events from editable elements, from
 * inside an open `[role="dialog"]`/`[role="alertdialog"]`, and any modifier-key
 * combo, and resets a partial sequence after an idle timeout. What the match
 * does (navigate…) is the caller's concern.
 */
export function useKeySequence(
  sequence: string[],
  onMatch: () => void,
  options: UseKeySequenceOptions = {}
): void {
  const { resetMs = 1000 } = options
  const onMatchRef = useRef(onMatch)
  onMatchRef.current = onMatch

  // Join to a stable primitive dep so an inline array doesn't re-bind every render.
  const sequenceKey = sequence.join('+').toLowerCase()

  useEffect(() => {
    if (!sequenceKey) return
    const target = sequenceKey.split('+')
    let buffer: string[] = []
    let timer: ReturnType<typeof setTimeout> | undefined

    const handler = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (isEditableTarget(event.target)) return
      if (isWithinDialog(event.target)) return
      const key = event.key.toLowerCase()
      if (key.length !== 1) {
        buffer = []
        return
      }
      buffer = [...buffer, key].slice(-target.length)
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        buffer = []
      }, resetMs)

      if (
        buffer.length === target.length &&
        buffer.every((entry, index) => entry === target[index])
      ) {
        buffer = []
        if (timer) clearTimeout(timer)
        onMatchRef.current()
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      if (timer) clearTimeout(timer)
    }
  }, [sequenceKey, resetMs])
}
