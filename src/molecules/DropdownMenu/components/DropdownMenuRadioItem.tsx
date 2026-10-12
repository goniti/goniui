'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Circle } from 'lucide-react'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

export const dropdownMenuRadioItemVariants = tv({
  base: [
    'relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm text-foreground outline-none transition-colors',
    'focus:bg-surface-2 focus:text-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ],
})

export type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
>

/** Menu item that behaves like a radio button; use inside RadioGroup. */
export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(function DropdownMenuRadioItem({ className, children, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={dropdownMenuRadioItemVariants({ className })}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="size-2 fill-current" aria-hidden />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
})
