'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ChevronRight } from 'lucide-react'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

export const dropdownMenuSubTriggerVariants = tv({
  base: [
    'flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground outline-none',
    'focus:bg-surface-2 data-[state=open]:bg-surface-2',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ],
  variants: {
    inset: {
      true: 'pl-8',
      false: '',
    },
  },
  defaultVariants: { inset: false },
})

export interface DropdownMenuSubTriggerProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> {
  inset?: boolean
}

/** Item that opens a nested sub-menu on hover/arrow key. */
export const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(function DropdownMenuSubTrigger({ className, inset, children, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={dropdownMenuSubTriggerVariants({ inset, className })}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4 text-foreground-muted" aria-hidden />
    </DropdownMenuPrimitive.SubTrigger>
  )
})
