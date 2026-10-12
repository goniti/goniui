'use client'

import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

import { SheetDialogTrigger } from './SheetDialog'

export type SheetTriggerProps = ComponentPropsWithoutRef<typeof SheetDialogTrigger>

/**
 * Sheet trigger — renders a button that opens the sheet.
 * Use `asChild` to render a custom element as the trigger.
 */
export const SheetTrigger = forwardRef<ElementRef<typeof SheetDialogTrigger>, SheetTriggerProps>(
  function SheetTrigger(props, ref) {
    return <SheetDialogTrigger ref={ref} {...props} />
  }
)
