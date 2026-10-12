'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

export const tabsContentVariants = tv({
  base: [
    'mt-2 ring-offset-white',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
  ],
})

export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>

/**
 * Radix tab panel — carries `role="tabpanel"`, `aria-labelledby`, and
 * hidden/shown management automatically. Content is lazily mounted by default.
 */
export const TabsContent = forwardRef<ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(
  function TabsContent({ className, ...props }, ref) {
    return (
      <TabsPrimitive.Content ref={ref} className={tabsContentVariants({ className })} {...props} />
    )
  }
)
