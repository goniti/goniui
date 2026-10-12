'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'

export type PopoverContentProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>

/** @internal Sole Radix integration point for Popover.Content — do not import elsewhere. */
export const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(function PopoverContent(props, ref) {
  return <PopoverPrimitive.Content ref={ref} {...props} />
})
