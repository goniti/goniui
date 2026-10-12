'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check } from 'lucide-react'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

export const dropdownMenuCheckboxItemVariants = tv({
  base: [
    'relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm text-foreground outline-none transition-colors',
    'focus:bg-surface-2 focus:text-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ],
})

export type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>

/** Menu item with a check indicator for boolean toggles. */
export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(function DropdownMenuCheckboxItem({ className, children, checked, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={dropdownMenuCheckboxItemVariants({ className })}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="size-4" aria-hidden />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
})
