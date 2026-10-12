'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/atoms/Checkbox'

export interface SelectionColumnLabels {
  /** Accessible name for the header "select all" checkbox — supplied by the app (§10). */
  selectAll?: string
  /** Accessible name for a row's checkbox. */
  selectRow?: string
}

/**
 * A leading checkbox column injected into the column model when row selection is
 * enabled — so selection flows through the normal cell/header rendering instead
 * of bespoke leading-cell markup. Not sortable, hideable, filterable.
 */
export function createSelectionColumn<TData>({
  selectAll,
  selectRow,
}: SelectionColumnLabels): ColumnDef<TData> {
  return {
    id: 'select',
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    size: 36,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? 'indeterminate'
              : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(Boolean(value))}
        aria-label={selectAll}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
        aria-label={selectRow}
      />
    ),
  }
}
