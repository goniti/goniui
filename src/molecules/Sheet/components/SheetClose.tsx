'use client'

import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

import { SheetDialogClose } from './SheetDialog'

export type SheetCloseProps = ComponentPropsWithoutRef<typeof SheetDialogClose>

/**
 * Sheet close trigger — any element that, when clicked, closes the sheet.
 * Typically wraps a Button or an icon button.
 */
export const SheetClose = forwardRef<ElementRef<typeof SheetDialogClose>, SheetCloseProps>(
  function SheetClose(props, ref) {
    return <SheetDialogClose ref={ref} {...props} />
  }
)
