'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { ComponentPropsWithoutRef } from 'react'

export type PopoverRootProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>

/** @internal Sole Radix integration point for Popover.Root — do not import elsewhere. */
export function PopoverRoot(props: PopoverRootProps) {
  return <PopoverPrimitive.Root {...props} />
}
