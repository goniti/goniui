'use client'

import type { Table } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import * as DropdownMenu from '@/molecules/DropdownMenu'

export interface DataTablePageSizeSelectProps<TData> {
  table: Table<TData>
  /** Selectable page sizes. Default `[10, 20, 50]` — the current page size is added if missing. */
  options?: number[]
  /** Accessible name prefix for the trigger (e.g. "Lignes par page") — supplied by the app (§10). */
  label?: string
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50]

/** Dropdown to change how many rows load per page — caps how much data the table fetches/renders at once. */
export function DataTablePageSizeSelect<TData>({
  table,
  options = DEFAULT_PAGE_SIZE_OPTIONS,
  label,
}: DataTablePageSizeSelectProps<TData>) {
  const pageSize = table.getState().pagination.pageSize
  const resolvedOptions = Array.from(new Set([...options, pageSize])).sort((a, b) => a - b)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="gap-1"
          aria-label={label ? `${label} : ${pageSize}` : undefined}
        >
          {pageSize}
          <Icon icon={ChevronDown} size="sm" className="max-w-none" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.RadioGroup
          value={String(pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          {resolvedOptions.map((option) => (
            <DropdownMenu.RadioItem key={option} value={String(option)}>
              {option}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
