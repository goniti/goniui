'use client'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type SeparatorRootProps = ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>

/** @internal Sole Radix integration point for Separator — do not import elsewhere. */
export const SeparatorRoot = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorRootProps
>(function SeparatorRoot(props, ref) {
  return <SeparatorPrimitive.Root ref={ref} {...props} />
})
