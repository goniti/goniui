'use client'

import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export type TableContainerProps = HTMLAttributes<HTMLDivElement>

/**
 * Scroll container for `<Table.Root>`. A table wider than its parent would
 * otherwise push the whole page into horizontal scroll on mobile; here the
 * overflow stays inside the table.
 */
export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  function TableContainer({ className, ...props }, ref) {
    return <div ref={ref} className={cn('w-full overflow-x-auto', className)} {...props} />
  }
)
