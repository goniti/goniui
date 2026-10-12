'use client'

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

import { NavigationMenuViewport } from './NavigationMenuViewport'

export const navigationMenuRootVariants = tv({
  base: 'relative z-10 flex max-w-max flex-1 items-center justify-center',
})

export type NavigationMenuRootProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>

/**
 * The Radix Navigation Menu root (a `<nav>` landmark). Hovering or focusing a
 * `Trigger` opens its `Content` panel, which morphs inside the shared animated
 * `Viewport` rendered here. Compose `List` › `Item` › `Trigger` + `Content`.
 */
export const NavigationMenuRoot = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuRootProps
>(function NavigationMenuRoot({ className, children, delayDuration = 100, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      delayDuration={delayDuration}
      className={navigationMenuRootVariants({ className })}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
})
