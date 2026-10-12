'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ComponentPropsWithoutRef } from 'react'

export type TooltipRootProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>

/** @internal Sole Radix integration point for Tooltip.Root — do not import elsewhere. */
export function TooltipRoot(props: TooltipRootProps) {
  return <TooltipPrimitive.Root {...props} />
}
