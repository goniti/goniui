'use client'

import { forwardRef, type TdHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>

/** `<td>` — body cell. Padding is controlled by `<Table.Root size>`. */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, ...props },
  ref
) {
  return <td ref={ref} className={cn('align-middle', className)} {...props} />
})
