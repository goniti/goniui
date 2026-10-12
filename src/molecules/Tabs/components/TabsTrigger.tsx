'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

import { useTabsVariant } from '../TabsContext'

export const tabsTriggerVariants = tv({
  base: [
    'inline-flex items-center justify-center whitespace-nowrap',
    'text-sm ring-offset-background transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=active]:bg-primary-400 data-[state=active]:text-primary-foreground',
  ],
  variants: {
    variant: {
      line: 'min-h-11 shrink-0 rounded-md px-3 py-1.5 font-medium data-[state=active]:shadow-sm md:min-h-0',
      segment:
        'flex-1 rounded-lg px-3 py-2.5 font-semibold data-[state=inactive]:hover:text-foreground',
    },
  },
  defaultVariants: { variant: 'line' },
})

export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>

/**
 * Radix tab button — sets `aria-selected`, manages focus, keyboard nav included.
 * Active state driven by `data-[state=active]` from Radix; `variant` from `Root`.
 */
export const TabsTrigger = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  function TabsTrigger({ className, ...props }, ref) {
    const variant = useTabsVariant()
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={tabsTriggerVariants({ variant, className })}
        {...props}
      />
    )
  }
)
