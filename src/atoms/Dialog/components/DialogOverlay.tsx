'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

export const dialogOverlayVariants = tv({
  base: [
    'fixed inset-0 z-[var(--z-overlay)] bg-overlay',
    'data-[state=open]:animate-dialog-overlay-in',
    'data-[state=closed]:animate-dialog-overlay-out',
  ],
})

export type DialogOverlayProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>

/** Full-viewport semi-transparent backdrop that fades in/out with the dialog. */
export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={dialogOverlayVariants({ className })}
      {...props}
    />
  )
})
