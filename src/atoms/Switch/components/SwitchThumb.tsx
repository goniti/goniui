'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type SwitchThumbProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Thumb>

/** @internal Sole Radix integration point for Switch.Thumb — do not import elsewhere. */
export const SwitchThumb = forwardRef<ElementRef<typeof SwitchPrimitive.Thumb>, SwitchThumbProps>(
  function SwitchThumb(props, ref) {
    return <SwitchPrimitive.Thumb ref={ref} {...props} />
  }
)
