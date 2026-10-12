'use client'

import { MoreVertical } from 'lucide-react'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import * as DropdownMenu from '@/molecules/DropdownMenu'

export interface DataTableRowAction {
  label: string
  onSelect: () => void
  /** Renders the action in the destructive style (e.g. delete). Default `false`. */
  destructive?: boolean
}

export interface DataTableRowActionsMenuProps {
  actions: DataTableRowAction[]
  /** Accessible name for the icon-only trigger — supplied by the app (§10). */
  label?: string
}

/**
 * Overflow menu for a row with more actions than fit as inline buttons (≳3) —
 * a `MoreVertical` trigger opens a dropdown listing each action. Prefer
 * `DataTableRowActions` for the common edit/delete pair.
 */
export function DataTableRowActionsMenu({ actions, label }: DataTableRowActionsMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" size="sm" aria-label={label}>
          <Icon icon={MoreVertical} size="sm" className="max-w-none" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {actions.map((action) => (
          <DropdownMenu.Item
            key={action.label}
            destructive={action.destructive}
            onSelect={() => action.onSelect()}
          >
            {action.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
