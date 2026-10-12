'use client'

import { ChevronsUpDown, SortAsc, SortDesc } from 'lucide-react'
import { forwardRef, type ThHTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Icon } from '@/atoms/Icon'
import { cn } from '@/lib/cn'

export const tableHeadVariants = tv({
  base: 'text-left align-middle font-medium text-foreground-muted',
  variants: {
    sortable: {
      true: 'cursor-pointer select-none hover:text-foreground',
      false: '',
    },
  },
  defaultVariants: { sortable: false },
})

export type SortDirection = 'asc' | 'desc'

export interface TableHeadProps
  extends ThHTMLAttributes<HTMLTableCellElement>, VariantProps<typeof tableHeadVariants> {
  /** Whether this column can be sorted by clicking. */
  sortable?: boolean
  /** Active sort direction for this column — `undefined` means this column is not currently sorted. */
  sortDirection?: SortDirection | undefined
  /**
   * Called when the user clicks to sort. Receives the next direction:
   * `undefined → 'asc' → 'desc' → 'asc' → …`
   */
  onSort?: (direction: SortDirection) => void
}

const SORT_ICONS = {
  none: ChevronsUpDown,
  asc: SortAsc,
  desc: SortDesc,
} as const

/** `<th>` — header cell with optional controlled sort affordance. */
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { sortable, sortDirection, onSort, className, children, ...props },
  ref
) {
  const nextDirection: SortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
  const sortIconKey = sortDirection ?? 'none'
  const sortIcon = SORT_ICONS[sortIconKey]

  const handleClick = sortable && onSort ? () => onSort(nextDirection) : undefined

  return (
    <th
      ref={ref}
      className={tableHeadVariants({ sortable, className })}
      onClick={handleClick}
      aria-sort={
        sortDirection === 'asc'
          ? 'ascending'
          : sortDirection === 'desc'
            ? 'descending'
            : sortable
              ? 'none'
              : undefined
      }
      {...props}
    >
      <span className={cn('inline-flex items-center gap-1.5')}>
        {children}
        {sortable && (
          <Icon
            icon={sortIcon}
            size="sm"
            intent="current"
            aria-hidden
            className={cn(
              'max-w-none',
              sortDirection ? 'text-primary-700 dark:text-primary-300' : 'text-foreground-muted'
            )}
          />
        )}
      </span>
    </th>
  )
})
