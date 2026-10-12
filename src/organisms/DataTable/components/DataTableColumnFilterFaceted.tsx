'use client'

import type { Column } from '@tanstack/react-table'

import { Badge } from '@/atoms/Badge'
import { Flex } from '@/atoms/layout/Flex'

export interface DataTableColumnFilterFacetedProps<TData> {
  column: Column<TData, unknown>
}

/**
 * Multi-select filter body: selected values render as removable chips in an
 * input-styled box; `filterOptions` below list only the not-yet-selected
 * values, so a picked option moves out of the list (no duplicate) and back in
 * once its chip is removed. Pair the column with a `filterFn` that reads the
 * array filter value.
 */
export function DataTableColumnFilterFaceted<TData>({
  column,
}: DataTableColumnFilterFacetedProps<TData>) {
  const rawValue = column.getFilterValue()
  const selected = Array.isArray(rawValue) ? (rawValue as string[]) : []
  const { filterOptions = [], filterOptionRemoveLabel } = column.columnDef.meta ?? {}
  const availableOptions = filterOptions.filter((option) => !selected.includes(option))

  function select(option: string) {
    column.setFilterValue([...selected, option])
  }

  function remove(option: string) {
    const next = selected.filter((value) => value !== option)
    column.setFilterValue(next.length ? next : undefined)
  }

  return (
    <Flex direction="col" gap="sm">
      <Flex
        wrap="wrap"
        gap="xs"
        className="min-h-9 rounded-lg border border-border bg-surface p-1.5"
      >
        {selected.map((option) => (
          <Badge
            key={option}
            variant="solid"
            onRemove={() => remove(option)}
            removeLabel={filterOptionRemoveLabel?.(option)}
          >
            {option}
          </Badge>
        ))}
      </Flex>
      <Flex wrap="wrap" gap="xs">
        {availableOptions.map((option) => (
          <button key={option} type="button" onClick={() => select(option)}>
            <Badge variant="outline">{option}</Badge>
          </button>
        ))}
      </Flex>
    </Flex>
  )
}
