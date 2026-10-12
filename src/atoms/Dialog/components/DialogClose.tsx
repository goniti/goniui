'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type DialogCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>

/**
 * Radix close trigger — any child element that when clicked closes the dialog.
 * Typically wraps a Button or an icon button.
 */
export const DialogClose = forwardRef<ElementRef<typeof DialogPrimitive.Close>, DialogCloseProps>(
  function DialogClose(props, ref) {
    return <DialogPrimitive.Close ref={ref} {...props} />
  }
)
