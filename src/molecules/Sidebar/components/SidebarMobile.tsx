'use client'

import { Menu } from 'lucide-react'
import { type ReactNode } from 'react'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import * as Tooltip from '@/atoms/Tooltip'
import { cn } from '@/lib/cn'
import * as Sheet from '@/molecules/Sheet'

import { SidebarContext } from '../SidebarContext'

const noop = () => {}

export interface SidebarMobileProps {
  /** Accessible name for the burger trigger button. */
  triggerLabel: string
  /** Accessible name for the bottom-sheet dialog. */
  label: string
  /** The sidebar content (e.g. `Sidebar.Group`s of `Sidebar.Item`s). */
  children: ReactNode
  /** Extra classes for the trigger (e.g. `md:hidden` to only show it on mobile). */
  className?: string
}

/**
 * The mobile presentation of the sidebar: a burger trigger that opens the same
 * items inside the bottom `Sheet`. Items render expanded (a `SidebarContext` is
 * provided), so the same `Sidebar.Group`/`Sidebar.Item` content drives both the
 * desktop rail and this sheet. Pair with a `Sidebar.Root` (hidden on mobile).
 */
export function SidebarMobile({ triggerLabel, label, children, className }: SidebarMobileProps) {
  return (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={triggerLabel}
          className={cn('h-9 w-9 p-0', className)}
        >
          <Icon icon={Menu} size="sm" />
        </Button>
      </Sheet.Trigger>
      <Sheet.Content aria-label={label}>
        <SidebarContext.Provider
          value={{
            expanded: true,
            mode: 'expanded',
            setMode: noop,
            shortcutsEnabled: true,
            setShortcutsEnabled: noop,
          }}
        >
          <Tooltip.Provider>{children}</Tooltip.Provider>
        </SidebarContext.Provider>
      </Sheet.Content>
    </Sheet.Root>
  )
}
