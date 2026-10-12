'use client'

import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>

/** `<tbody>` — semantic body section. Rows stripe via `even:bg-surface-2/60` on `<Table.Row>`. */
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(function TableBody(
  { className, ...props },
  ref
) {
  return <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
})
