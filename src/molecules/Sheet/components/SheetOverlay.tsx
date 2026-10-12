'use client'

import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/cn'

import { SheetDialogOverlay } from './SheetDialog'

export const sheetOverlayVariants = tv({
  base: 'fixed inset-0 z-[var(--z-overlay)] bg-black/40 backdrop-blur-sm data-[state=open]:animate-sheet-overlay-in data-[state=closed]:animate-sheet-overlay-out',
})

export type SheetOverlayProps = ComponentPropsWithoutRef<typeof SheetDialogOverlay>

/** Full-viewport blurred backdrop that fades with the sheet. */
export const SheetOverlay = forwardRef<ElementRef<typeof SheetDialogOverlay>, SheetOverlayProps>(
  function SheetOverlay({ className, ...props }, ref) {
    return (
      <SheetDialogOverlay
        ref={ref}
        className={cn(sheetOverlayVariants(), className)}
        data-sheet-overlay
        {...props}
      />
    )
  }
)
