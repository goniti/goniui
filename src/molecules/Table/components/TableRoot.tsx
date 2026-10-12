'use client'

import { forwardRef, type TableHTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const tableRootVariants = tv({
  base: 'w-full caption-bottom border-collapse text-sm',
  variants: {
    size: {
      sm: '[&_td]:px-3 [&_td]:py-2 [&_th]:px-3 [&_th]:py-2',
      md: '[&_td]:px-4 [&_td]:py-3 [&_th]:px-4 [&_th]:py-3',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface TableRootProps
  extends TableHTMLAttributes<HTMLTableElement>, VariantProps<typeof tableRootVariants> {}

/**
 * Root `<table>` element with token-backed padding variants. Wrap in
 * `<Table.Container>` when the table may overflow its viewport — otherwise the
 * overflow scrolls the whole page sideways on mobile.
 */
export const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(function TableRoot(
  { size, className, ...props },
  ref
) {
  return <table ref={ref} className={tableRootVariants({ size, className })} {...props} />
})
