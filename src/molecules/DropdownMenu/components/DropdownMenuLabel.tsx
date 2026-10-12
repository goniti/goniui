'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

export const dropdownMenuLabelVariants = tv({
  base: 'px-2 py-1.5 text-xs font-semibold text-foreground-muted',
  variants: {
    inset: {
      true: 'pl-8',
      false: '',
    },
  },
  defaultVariants: { inset: false },
})

export interface DropdownMenuLabelProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> {
  inset?: boolean
}

/** Non-interactive section heading within the dropdown. */
export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(function DropdownMenuLabel({ className, inset, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={dropdownMenuLabelVariants({ inset, className })}
      {...props}
    />
  )
})
