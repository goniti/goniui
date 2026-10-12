'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type CheckboxIndicatorProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator>

/** @internal Sole Radix integration point for Checkbox.Indicator — do not import elsewhere. */
export const CheckboxIndicator = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Indicator>,
  CheckboxIndicatorProps
>(function CheckboxIndicator(props, ref) {
  return <CheckboxPrimitive.Indicator ref={ref} {...props} />
})
