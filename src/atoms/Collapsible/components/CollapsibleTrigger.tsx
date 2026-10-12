'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type CollapsibleTriggerProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>

/**
 * Radix disclosure trigger. Renders a native `<button>` with `data-state` and
 * full keyboard support — not the action `Button` atom.
 */
export const CollapsibleTrigger = forwardRef<
  ElementRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(function CollapsibleTrigger(props, ref) {
  return <CollapsiblePrimitive.Trigger ref={ref} type="button" {...props} />
})
