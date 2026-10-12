'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type { ComponentPropsWithoutRef } from 'react'

export type DropdownMenuRootProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>

/** Radix DropdownMenu root — owns open state (controlled or uncontrolled). */
export function DropdownMenuRoot(props: DropdownMenuRootProps) {
  return <DropdownMenuPrimitive.Root {...props} />
}
