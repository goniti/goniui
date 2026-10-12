'use client'

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

import { Flex } from '@/atoms/layout/Flex'

export const navigationMenuViewportVariants = tv({
  base: [
    'relative mt-2.5 w-full overflow-hidden rounded-lg border border-border bg-surface',
    'text-foreground shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]',
    // Height/width track Radix's measured panel size and transition, so switching
    // between two panels of different sizes morphs smoothly. The open/close itself
    // is a keyframe: fade in while rising into place from below (Relume-style).
    'h-[var(--radix-navigation-menu-viewport-height)] origin-top',
    'transition-[height,width] duration-200 ease-out',
    'data-[state=open]:animate-navigation-menu-in data-[state=closed]:animate-navigation-menu-out',
    'motion-reduce:animate-none motion-reduce:transition-none',
  ],
})

export type NavigationMenuViewportProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Viewport
>

/**
 * @internal The animated panel container the active `Content` morphs into.
 * Rendered automatically by `NavigationMenuRoot`; sole Radix integration point
 * for `Viewport`.
 */
export const NavigationMenuViewport = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  NavigationMenuViewportProps
>(function NavigationMenuViewport({ className, ...props }, ref) {
  return (
    <Flex justify="center" className="absolute left-0 top-full">
      <NavigationMenuPrimitive.Viewport
        ref={ref}
        className={navigationMenuViewportVariants({ className })}
        {...props}
      />
    </Flex>
  )
})
