'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { DialogOverlay } from './DialogOverlay'
import { DialogPortal } from './DialogPortal'

export const dialogContentVariants = tv({
  base: [
    'fixed left-1/2 top-1/2 z-[var(--z-dialog)] -translate-x-1/2 -translate-y-1/2',
    'w-[calc(100%-2rem)] rounded-xl border border-border bg-surface p-6 text-foreground shadow-xl',
    'max-h-[calc(100dvh-2rem)] overflow-y-auto',
    'focus:outline-none',
    'data-[state=open]:animate-dialog-content-in',
    'data-[state=closed]:animate-dialog-content-out',
  ],
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface DialogContentProps
  extends
    ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  children?: ReactNode
}

/**
 * Dialog panel — automatically rendered inside a `DialogPortal` with a
 * `DialogOverlay`. Supports `size` variants (`sm` / `md` / `lg` / `xl`).
 */
export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent({ className, size, children, ...props }, ref) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={dialogContentVariants({ size, className })}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
