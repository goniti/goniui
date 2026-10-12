'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type StarRatingGroupRootProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>

/** @internal Sole Radix integration point for StarRating's radiogroup root — do not import elsewhere. */
export const StarRatingGroupRoot = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  StarRatingGroupRootProps
>(function StarRatingGroupRoot(props, ref) {
  return <RadioGroupPrimitive.Root ref={ref} {...props} />
})
