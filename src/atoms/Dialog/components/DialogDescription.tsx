'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

export const dialogDescriptionVariants = tv({
  base: 'text-sm text-foreground-muted leading-relaxed',
})

export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>

/** Semantic dialog description (p by default). Accessible via aria-describedby. */
export const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={dialogDescriptionVariants({ className })}
      {...props}
    />
  )
})
