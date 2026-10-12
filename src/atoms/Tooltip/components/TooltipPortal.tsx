'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ComponentPropsWithoutRef } from 'react'

export type TooltipPortalProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Portal>

/** @internal Sole Radix integration point for Tooltip.Portal — do not import elsewhere. */
export function TooltipPortal(props: TooltipPortalProps) {
  return <TooltipPrimitive.Portal {...props} />
}
