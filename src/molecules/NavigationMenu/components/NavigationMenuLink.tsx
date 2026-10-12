'use client'

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/cn'

/**
 * Style for a **panel-row** link (the rich rows inside a `Content`): a block with
 * padding, rounding, and a hover/active background. Apply it via `className` —
 * `<NavigationMenu.Link className={navigationMenuLinkVariants()}>`. Top-level
 * links use `navigationMenuTriggerStyle()` instead (no row background), so the
 * two never collide.
 */
export const navigationMenuLinkVariants = tv({
  base: [
    'block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors',
    'hover:bg-surface-2 focus:bg-surface-2 data-[active]:bg-surface-2',
  ],
})

export type NavigationMenuLinkProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>

/**
 * A navigation link. Unstyled by default beyond a focus ring — pass the role's
 * style via `className`: `navigationMenuTriggerStyle()` for a top-level entry, or
 * `navigationMenuLinkVariants()` for a panel row. Supports `asChild` to inject a
 * router `Link`/`NavLink` (SPA navigation).
 */
export const NavigationMenuLink = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps
>(function NavigationMenuLink({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      className={cn(
        'rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
        className
      )}
      {...props}
    />
  )
})
