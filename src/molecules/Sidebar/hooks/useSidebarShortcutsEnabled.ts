'use client'

import { useCallback, useState } from 'react'

/**
 * Controllable "keyboard shortcuts enabled" state (WCAG 2.1.4 escape hatch) —
 * mirrors `useSidebarMode`: `controlledEnabled` (when defined) wins, otherwise the
 * state is internal, seeded from `defaultEnabled`. `onEnabledChange` fires in both
 * cases. Persistence (e.g. localStorage) is the consuming app's concern.
 */
export function useSidebarShortcutsEnabled(
  controlledEnabled: boolean | undefined,
  defaultEnabled: boolean,
  onEnabledChange?: (enabled: boolean) => void
): [boolean, (enabled: boolean) => void] {
  const [internal, setInternal] = useState(defaultEnabled)
  const enabled = controlledEnabled ?? internal

  const setEnabled = useCallback(
    (next: boolean) => {
      if (controlledEnabled === undefined) setInternal(next)
      onEnabledChange?.(next)
    },
    [controlledEnabled, onEnabledChange]
  )

  return [enabled, setEnabled]
}
