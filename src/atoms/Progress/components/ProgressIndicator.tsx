'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type ProgressIndicatorProps = ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator>

/** @internal Sole Radix integration point for Progress.Indicator — do not import elsewhere. */
export const ProgressIndicator = forwardRef<
  ElementRef<typeof ProgressPrimitive.Indicator>,
  ProgressIndicatorProps
>(function ProgressIndicator(props, ref) {
  return <ProgressPrimitive.Indicator ref={ref} {...props} />
})
