'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type CheckboxRootProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

/** @internal Sole Radix integration point for Checkbox.Root — do not import elsewhere. */
export const CheckboxRoot = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxRootProps
>(function CheckboxRoot(props, ref) {
  return <CheckboxPrimitive.Root ref={ref} {...props} />
})
