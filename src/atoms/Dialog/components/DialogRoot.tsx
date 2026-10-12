'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ComponentPropsWithoutRef } from 'react'

export type DialogRootProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

/** Radix Dialog root — owns open state (controlled or uncontrolled). */
export function DialogRoot(props: DialogRootProps) {
  return <DialogPrimitive.Root {...props} />
}
