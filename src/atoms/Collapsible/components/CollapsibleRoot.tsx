'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import type { ComponentPropsWithoutRef } from 'react'

export type CollapsibleRootProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>

/** Radix Collapsible root — owns open state (controlled or uncontrolled). */
export function CollapsibleRoot(props: CollapsibleRootProps) {
  return <CollapsiblePrimitive.Root {...props} />
}
