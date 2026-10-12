'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type DialogTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>

/**
 * Radix Dialog trigger — renders a button that opens the dialog.
 * Forwards ref so consumers can imperatively focus or measure it.
 */
export const DialogTrigger = forwardRef<
  ElementRef<typeof DialogPrimitive.Trigger>,
  DialogTriggerProps
>(function DialogTrigger(props, ref) {
  return <DialogPrimitive.Trigger ref={ref} {...props} />
})
