'use client'

import type { Column } from '@tanstack/react-table'
import { Filter } from 'lucide-react'
import { tv } from 'tailwind-variants'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import { cn } from '@/lib/cn'
import * as Popover from '@/molecules/Popover'

import { DataTableColumnFilterFaceted } from './DataTableColumnFilterFaceted'
import { DataTableColumnFilterText } from './DataTableColumnFilterText'

export interface DataTableColumnFilterProps<TData> {
  column: Column<TData, unknown>
}

const popoverContentVariants = tv({
  base: [
    'z-[var(--z-popover)] min-w-56 rounded-lg border border-border bg-surface p-3 shadow-lg',
    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  ],
})

const FILTER_BODIES = {
  text: DataTableColumnFilterText,
  faceted: DataTableColumnFilterFaceted,
} as const

function isFilterValueActive(value: unknown): boolean {
  return Array.isArray(value) ? value.length > 0 : typeof value === 'string' && value.length > 0
}

/**
 * Filter affordance for a single column: a `Filter` trigger sitting next to the
 * sort icon (mirrors the sort affordance, no second header row) that opens a
 * popover with the filter body for `meta.filterVariant` (`'text'` by default,
 * or `'faceted'` for a multi-select of `meta.filterOptions`). `stopPropagation`
 * on the trigger and panel keeps opening/toggling from also sorting the column.
 */
export function DataTableColumnFilter<TData>({ column }: DataTableColumnFilterProps<TData>) {
  const { filterVariant = 'text', filterLabel } = column.columnDef.meta ?? {}
  const isActive = isFilterValueActive(column.getFilterValue())
  const FilterBody = FILTER_BODIES[filterVariant]

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={filterLabel}
          onClick={(event) => event.stopPropagation()}
        >
          <Icon
            icon={Filter}
            size="sm"
            className={cn('max-w-none', isActive ? 'text-primary-700' : 'text-foreground-muted')}
          />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className={popoverContentVariants()}
          onClick={(event) => event.stopPropagation()}
        >
          <FilterBody column={column} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
