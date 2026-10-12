'use client'

import { createContext, type ReactNode, useContext } from 'react'

export type SidebarMode = 'expanded' | 'collapsed' | 'hover'

export interface SidebarContextValue {
  /** Resolved visual state — `false` when the rail is showing icons only. */
  expanded: boolean
  /** The user's chosen display mode. */
  mode: SidebarMode
  setMode: (mode: SidebarMode) => void
  /** Word shown between an item's shortcut keys in its hint (e.g. translated "then"). */
  shortcutSeparator?: ReactNode
  /**
   * Whether `g`+letter keyboard shortcuts are active (WCAG 2.1.4 escape hatch).
   * `false` means no `keydown` listener is registered and no hint is shown.
   */
  shortcutsEnabled: boolean
  setShortcutsEnabled: (enabled: boolean) => void
}

export const SidebarContext = createContext<SidebarContextValue | null>(null)

/** Read the Sidebar context. Throws outside `Sidebar.Root` — for parts that need `setMode`. */
export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within Sidebar.Root')
  return ctx
}
