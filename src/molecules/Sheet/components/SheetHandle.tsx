'use client'

import { type HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/cn'

export const sheetHandleVariants = tv({
  base: 'mx-auto mt-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-foreground/25',
  variants: {
    resizable: {
      true: 'cursor-grab touch-none active:cursor-grabbing',
      false: '',
    },
  },
  defaultVariants: { resizable: false },
})

export interface SheetHandleProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof sheetHandleVariants> {}

/** Visual handle bar rendered at the top of the sheet panel — draggable when `snapPoints` drives it. */
export function SheetHandle({ className, resizable, ...props }: SheetHandleProps) {
  return (
    <div
      className={cn(sheetHandleVariants({ resizable }), className)}
      data-sheet-handle
      {...props}
    />
  )
}
