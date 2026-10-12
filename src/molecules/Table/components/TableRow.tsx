'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const tableRowVariants = tv({
  base: 'border-b border-border transition-colors',
  variants: {
    interactive: {
      true: 'cursor-pointer hover:bg-primary-50',
      false: '',
    },
    striped: {
      true: 'even:bg-surface-2/60',
      false: '',
    },
  },
  defaultVariants: { interactive: false, striped: false },
})

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>, VariantProps<typeof tableRowVariants> {}

/** `<tr>` — table row. Optional `interactive` adds hover state; `striped` alternates background. */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { interactive, striped, className, ...props },
  ref
) {
  return (
    <tr ref={ref} className={tableRowVariants({ interactive, striped, className })} {...props} />
  )
})
