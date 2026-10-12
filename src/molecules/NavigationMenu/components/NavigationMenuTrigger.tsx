'use client'

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { ChevronDown } from 'lucide-react'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

import { Icon } from '@/atoms/Icon'

/**
 * Shared style for an interactive top-level entry. Exported so a plain
 * `NavigationMenu.Link` that has no panel can match a `Trigger` visually:
 * `<NavigationMenu.Link className={navigationMenuTriggerStyle()}>`.
 */
export const navigationMenuTriggerStyle = tv({
  base: [
    'group relative inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2',
    'bg-surface text-sm font-medium text-foreground/90 transition-colors',
    'hover:text-foreground data-[state=open]:text-foreground',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
    'disabled:pointer-events-none disabled:opacity-50',
    // Animated wipe underline: grows left→right on hover/focus, stays while the
    // panel is open, retreats right→left on leave.
    'after:pointer-events-none after:absolute after:inset-x-4 after:bottom-1 after:h-0.5',
    'after:rounded-full after:bg-primary-400 after:origin-left after:scale-x-0',
    'after:transition-transform after:duration-300 after:ease-out',
    'hover:after:scale-x-100 focus-visible:after:scale-x-100 data-[state=open]:after:scale-x-100',
    'motion-reduce:after:transition-none',
  ],
})

export type NavigationMenuTriggerProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Trigger
>

/** The button that reveals its `Content` panel on hover/focus, with a chevron that flips when open. */
export const NavigationMenuTrigger = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigationMenuTriggerProps
>(function NavigationMenuTrigger({ className, children, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={navigationMenuTriggerStyle({ className })}
      {...props}
    >
      {children}
      <Icon
        icon={ChevronDown}
        size="sm"
        className="ml-1 transition-transform duration-300 group-data-[state=open]:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  )
})
