'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ComponentPropsWithoutRef } from 'react'

export type DialogPortalProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>

/** Portals Dialog children into document.body (or a custom container). */
export function DialogPortal(props: DialogPortalProps) {
  return <DialogPrimitive.Portal {...props} />
}
