'use client'

import { useCallback, useState } from 'react'

import type { SidebarMode } from '../SidebarContext'

/**
 * Controllable display-mode state: `controlledMode` (when defined) wins, otherwise
 * the state is internal, seeded from `defaultMode`. `onModeChange` fires in both
 * cases. Persistence (e.g. localStorage) is the consuming app's concern.
 */
export function useSidebarMode(
  controlledMode: SidebarMode | undefined,
  defaultMode: SidebarMode,
  onModeChange?: (mode: SidebarMode) => void
): [SidebarMode, (mode: SidebarMode) => void] {
  const [internal, setInternal] = useState(defaultMode)
  const mode = controlledMode ?? internal

  const setMode = useCallback(
    (next: SidebarMode) => {
      if (controlledMode === undefined) setInternal(next)
      onModeChange?.(next)
    },
    [controlledMode, onModeChange]
  )

  return [mode, setMode]
}
