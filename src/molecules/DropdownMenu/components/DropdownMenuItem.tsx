'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const dropdownMenuItemVariants = tv({
  base: [
    'relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground outline-none transition-colors',
    'focus:bg-surface-2 focus:text-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ],
  variants: {
    inset: {
      true: 'pl-8',
      false: '',
    },
    destructive: {
      true: 'text-error-600 focus:bg-error-50 focus:text-error-700',
      false: '',
    },
  },
  defaultVariants: {
    inset: false,
    destructive: false,
  },
})

export interface DropdownMenuItemProps
  extends
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
    VariantProps<typeof dropdownMenuItemVariants> {}

/** A single interactive row in the dropdown panel. Supports keyboard navigation. */
export const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(function DropdownMenuItem({ className, inset, destructive, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={dropdownMenuItemVariants({ inset, destructive, className })}
      {...props}
    />
  )
})
