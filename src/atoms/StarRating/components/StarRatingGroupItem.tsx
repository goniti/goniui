'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type StarRatingGroupItemProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>

/** @internal Sole Radix integration point for StarRating's radio item — do not import elsewhere. */
export const StarRatingGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  StarRatingGroupItemProps
>(function StarRatingGroupItem(props, ref) {
  return <RadioGroupPrimitive.Item ref={ref} {...props} />
})
