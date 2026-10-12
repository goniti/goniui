'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

export const dialogTitleVariants = tv({
  base: 'text-lg font-semibold text-foreground leading-tight',
})

export type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>

/** Semantic dialog title (h2 by default). Accessible via aria-labelledby. */
export const DialogTitle = forwardRef<ElementRef<typeof DialogPrimitive.Title>, DialogTitleProps>(
  function DialogTitle({ className, ...props }, ref) {
    return (
      <DialogPrimitive.Title ref={ref} className={dialogTitleVariants({ className })} {...props} />
    )
  }
)
