'use client'

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

export const navigationMenuListVariants = tv({
  base: 'group flex flex-1 list-none items-center justify-center gap-1',
})

export type NavigationMenuListProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>

/** The horizontal list of top-level navigation items. */
export const NavigationMenuList = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.List>,
  NavigationMenuListProps
>(function NavigationMenuList({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={navigationMenuListVariants({ className })}
      {...props}
    />
  )
})
