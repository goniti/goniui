'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type ProgressRootProps = ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>

/** @internal Sole Radix integration point for Progress.Root — do not import elsewhere. */
export const ProgressRoot = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ProgressRootProps
>(function ProgressRoot(props, ref) {
  return <ProgressPrimitive.Root ref={ref} {...props} />
})
