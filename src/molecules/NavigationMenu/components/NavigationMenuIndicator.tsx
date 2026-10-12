'use client'

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

import { Box } from '@/atoms/layout/Box'

export const navigationMenuIndicatorVariants = tv({
  base: ['group/arrow top-full z-20 flex justify-center'],
})

export const navigationMenuArrowVariants = tv({
  base: [
    'relative top-1 h-3 w-3 rotate-45 rounded-tl-sm border-l border-t border-border bg-surface',
    // Rises + fades with the panel; the negative delay (baked into the keyframe var)
    // catches it up to the panel, which Radix mounts a frame earlier.
    'group-data-[state=visible]/arrow:animate-navigation-menu-arrow-in',
    'group-data-[state=hidden]/arrow:animate-navigation-menu-out',
    'motion-reduce:animate-none',
  ],
})

export type NavigationMenuIndicatorProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Indicator
>

/** The small arrow that slides under the active trigger to point at its open panel. */
export const NavigationMenuIndicator = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  NavigationMenuIndicatorProps
>(function NavigationMenuIndicator({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={navigationMenuIndicatorVariants({ className })}
      {...props}
    >
      {/* A white diamond centered on the card's top edge (down in the gap below the
          trigger): its two bordered upper edges form the arrow point above the card,
          its lower half overlaps the card so its white fill breaks the top border
          there — arrow + card read as one outward-pointing tooltip notch. It rises +
          fades with the panel. Radix mounts the Indicator a frame after the panel, so
          its keyframe carries a negative delay: it starts already partway in, caught
          up to the panel's progress, instead of popping in late. Only translate +
          opacity move; the 45° rotation is a separate CSS property, untouched. */}
      <Box className={navigationMenuArrowVariants()} />
    </NavigationMenuPrimitive.Indicator>
  )
})
