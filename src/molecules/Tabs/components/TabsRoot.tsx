'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

import { TabsProvider, type TabsVariant } from '../TabsContext'

export interface TabsRootProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  /** Visual style shared by `List` and `Trigger`. Defaults to `line`. */
  variant?: TabsVariant
}

/**
 * Radix Tabs root — owns value state (controlled or uncontrolled).
 * Provides the ARIA `tablist`/`tabpanel` relationship automatically, and the
 * `variant` so `List`/`Trigger` render consistently without repeating the prop.
 */
export const TabsRoot = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabsRootProps>(
  function TabsRoot({ variant = 'line', ...props }, ref) {
    return (
      <TabsProvider value={variant}>
        <TabsPrimitive.Root ref={ref} {...props} />
      </TabsProvider>
    )
  }
)
