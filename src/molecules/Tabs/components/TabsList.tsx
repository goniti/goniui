'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

import { useTabsVariant } from '../TabsContext'

export const tabsListVariants = tv({
  base: 'bg-surface-2 p-1 text-foreground-muted',
  variants: {
    variant: {
      line: 'flex max-w-full items-center overflow-x-auto rounded-lg',
      segment: 'flex w-full items-stretch gap-1 rounded-xl border border-border',
    },
  },
  defaultVariants: { variant: 'line' },
})

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>

/**
 * Radix `tablist` container — renders a row of triggers with ARIA role wired.
 * The `variant` comes from `Tabs.Root`; style via `className` on top.
 */
export const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  function TabsList({ className, ...props }, ref) {
    const variant = useTabsVariant()
    return (
      <TabsPrimitive.List
        ref={ref}
        className={tabsListVariants({ variant, className })}
        {...props}
      />
    )
  }
)
