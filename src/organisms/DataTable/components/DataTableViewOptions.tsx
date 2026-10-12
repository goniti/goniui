'use client'

import type { Table } from '@tanstack/react-table'
import { SlidersHorizontal } from 'lucide-react'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import * as DropdownMenu from '@/molecules/DropdownMenu'

export interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  /** Accessible name for the icon-only trigger — supplied by the app (§10). */
  label?: string
}

/**
 * Dropdown that toggles each hideable column's visibility. Column display names
 * come from `columnDef.meta.label`, falling back to the column id.
 */
export function DataTableViewOptions<TData>({ table, label }: DataTableViewOptionsProps<TData>) {
  const hideableColumns = table.getAllColumns().filter((column) => column.getCanHide())

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="secondary" size="sm" aria-label={label}>
          <Icon icon={SlidersHorizontal} size="sm" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {hideableColumns.map((column) => (
          <DropdownMenu.CheckboxItem
            key={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
            onSelect={(event) => event.preventDefault()}
          >
            {column.columnDef.meta?.label ?? column.id}
          </DropdownMenu.CheckboxItem>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
