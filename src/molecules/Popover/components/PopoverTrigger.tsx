'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>

/** @internal Sole Radix integration point for Popover.Trigger — do not import elsewhere. */
export const PopoverTrigger = forwardRef<
  ElementRef<typeof PopoverPrimitive.Trigger>,
  PopoverTriggerProps
>(function PopoverTrigger(props, ref) {
  return <PopoverPrimitive.Trigger ref={ref} {...props} />
})
