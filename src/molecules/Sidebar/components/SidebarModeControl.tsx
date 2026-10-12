'use client'

import { PanelLeft } from 'lucide-react'
import { forwardRef, type ReactNode } from 'react'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import * as DropdownMenu from '@/molecules/DropdownMenu'

import { type SidebarMode, useSidebar } from '../SidebarContext'

export interface SidebarModeControlProps {
  /** Accessible name for the trigger + the options group (translated by the app). */
  label: string
  /** Translated label for each mode. */
  expandedLabel: string
  collapsedLabel: string
  hoverLabel: string
  /**
   * Label for the "keyboard shortcuts" toggle (translated by the app). When set,
   * a checkbox item is added below the modes, wired to `Sidebar.Root`'s
   * `shortcutsEnabled` state (WCAG 2.1.4 — shortcuts stay opt-out). Omit to hide it.
   */
  shortcutsLabel?: string
  /**
   * Extra `DropdownMenu` content appended after the modes/shortcuts (e.g. a
   * theme switcher), separated by a `Separator`. Keeps this molecule generic —
   * the app composes whatever it needs from `goniui/dropdown-menu`.
   */
  children?: ReactNode
}

/**
 * Bottom control that lets the user pick the sidebar display mode
 * (Expanded / Collapsed / Expand on hover) via a DropdownMenu with radio items,
 * plus an optional checkbox to turn the `g`+letter keyboard shortcuts on/off and
 * an optional `children` slot for whatever else the app wants in this menu
 * (e.g. a theme switcher). Place it inside `Sidebar.Footer`. Labels are passed
 * in (translated by the app).
 */
export const SidebarModeControl = forwardRef<HTMLButtonElement, SidebarModeControlProps>(
  function SidebarModeControl(
    { label, expandedLabel, collapsedLabel, hoverLabel, shortcutsLabel, children },
    ref
  ) {
    const { mode, setMode, shortcutsEnabled, setShortcutsEnabled } = useSidebar()
    const options: [SidebarMode, string][] = [
      ['expanded', expandedLabel],
      ['collapsed', collapsedLabel],
      ['hover', hoverLabel],
    ]

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            size="sm"
            aria-label={label}
            className="h-9 w-9 shrink-0 p-0"
          >
            <Icon icon={PanelLeft} size="sm" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content side="top" align="start" sideOffset={8} className="min-w-44">
            <DropdownMenu.RadioGroup
              value={mode}
              onValueChange={(value) => setMode(value as SidebarMode)}
            >
              {options.map(([value, optionLabel]) => (
                <DropdownMenu.RadioItem key={value} value={value}>
                  {optionLabel}
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
            {shortcutsLabel ? (
              <>
                <DropdownMenu.Separator />
                <DropdownMenu.CheckboxItem
                  checked={shortcutsEnabled}
                  onCheckedChange={setShortcutsEnabled}
                >
                  {shortcutsLabel}
                </DropdownMenu.CheckboxItem>
              </>
            ) : null}
            {children ? (
              <>
                <DropdownMenu.Separator />
                {children}
              </>
            ) : null}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }
)
