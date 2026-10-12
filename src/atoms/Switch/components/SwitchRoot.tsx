'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type SwitchRootProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>

/** @internal Sole Radix integration point for Switch.Root — do not import elsewhere. */
export const SwitchRoot = forwardRef<ElementRef<typeof SwitchPrimitive.Root>, SwitchRootProps>(
  function SwitchRoot(props, ref) {
    return <SwitchPrimitive.Root ref={ref} {...props} />
  }
)
