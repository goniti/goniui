'use client'

import {
  type FocusEvent,
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useState,
} from 'react'
import { tv } from 'tailwind-variants'

import * as Tooltip from '@/atoms/Tooltip'

import { useSidebarMode } from '../hooks/useSidebarMode'
import { useSidebarShortcutsEnabled } from '../hooks/useSidebarShortcutsEnabled'
import { SidebarContext, type SidebarContextValue, type SidebarMode } from '../SidebarContext'

export const sidebarVariants = tv({
  base:
    'flex h-full flex-col gap-1 border-r border-border bg-surface p-3 ' +
    'transition-[width] duration-200 ease-in-out motion-reduce:transition-none',
  variants: {
    expanded: { true: 'w-60', false: 'w-16' },
  },
  defaultVariants: { expanded: true },
})

export interface SidebarRootProps extends HTMLAttributes<HTMLElement> {
  /** Accessible name for the `<nav>` landmark. Defaults to "Sidebar". */
  'aria-label'?: string
  /** Display mode (controlled): `expanded` | `collapsed` | `hover`. */
  mode?: SidebarMode
  /** Initial display mode (uncontrolled). Defaults to `expanded`. */
  defaultMode?: SidebarMode
  /** Fires when the mode changes (e.g. from the mode control). Persist it app-side. */
  onModeChange?: (mode: SidebarMode) => void
  /** Word shown between an item's shortcut keys in its hint — translated by the app (e.g. "then"). */
  shortcutSeparator?: ReactNode
  /** Whether `g`+letter keyboard shortcuts are active (controlled). WCAG 2.1.4 escape hatch. */
  shortcutsEnabled?: boolean
  /** Initial shortcuts-enabled state (uncontrolled). Defaults to `true`. */
  defaultShortcutsEnabled?: boolean
  /** Fires when the shortcuts toggle changes (e.g. from the mode control). Persist it app-side. */
  onShortcutsEnabledChange?: (enabled: boolean) => void
}

/**
 * The `<nav>` landmark framing the Sidebar compound — a full-height vertical
 * column whose width follows the display mode: `expanded` (icons + labels),
 * `collapsed` (icons only), or `hover` (collapsed, expanding while the pointer or
 * keyboard focus is inside). Compose `Sidebar.Header`, `Sidebar.Group`, and
 * `Sidebar.Footer` (with `Sidebar.ModeControl`) inside.
 */
export const SidebarRoot = forwardRef<HTMLElement, SidebarRootProps>(function SidebarRoot(
  {
    mode: modeProp,
    defaultMode = 'expanded',
    onModeChange,
    shortcutSeparator,
    shortcutsEnabled: shortcutsEnabledProp,
    defaultShortcutsEnabled = true,
    onShortcutsEnabledChange,
    className,
    children,
    'aria-label': ariaLabel = 'Sidebar',
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...props
  },
  ref
) {
  const [mode, setMode] = useSidebarMode(modeProp, defaultMode, onModeChange)
  const [shortcutsEnabled, setShortcutsEnabled] = useSidebarShortcutsEnabled(
    shortcutsEnabledProp,
    defaultShortcutsEnabled,
    onShortcutsEnabledChange
  )
  const [hovering, setHovering] = useState(false)
  const expanded = mode === 'expanded' || (mode === 'hover' && hovering)

  const ctx: SidebarContextValue = {
    expanded,
    mode,
    setMode,
    shortcutSeparator,
    shortcutsEnabled,
    setShortcutsEnabled,
  }

  return (
    <SidebarContext.Provider value={ctx}>
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={sidebarVariants({ expanded, className })}
        onMouseEnter={(event: MouseEvent<HTMLElement>) => {
          if (mode === 'hover') setHovering(true)
          onMouseEnter?.(event)
        }}
        onMouseLeave={(event: MouseEvent<HTMLElement>) => {
          if (mode === 'hover') setHovering(false)
          onMouseLeave?.(event)
        }}
        onFocus={(event: FocusEvent<HTMLElement>) => {
          if (mode === 'hover') setHovering(true)
          onFocus?.(event)
        }}
        onBlur={(event: FocusEvent<HTMLElement>) => {
          if (mode === 'hover' && !event.currentTarget.contains(event.relatedTarget)) {
            setHovering(false)
          }
          onBlur?.(event)
        }}
        {...props}
      >
        <Tooltip.Provider delayDuration={300}>{children}</Tooltip.Provider>
      </nav>
    </SidebarContext.Provider>
  )
})
