'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type TooltipTriggerProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>

/** @internal Sole Radix integration point for Tooltip.Trigger — do not import elsewhere. */
export const TooltipTrigger = forwardRef<
  ElementRef<typeof TooltipPrimitive.Trigger>,
  TooltipTriggerProps
>(function TooltipTrigger(props, ref) {
  return <TooltipPrimitive.Trigger ref={ref} {...props} />
})
