'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { ComponentPropsWithoutRef } from 'react'

export type PopoverPortalProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Portal>

/** @internal Sole Radix integration point for Popover.Portal — do not import elsewhere. */
export function PopoverPortal(props: PopoverPortalProps) {
  return <PopoverPrimitive.Portal {...props} />
}
