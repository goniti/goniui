'use client'

import type { HTMLAttributes } from 'react'

import { Flex } from '@/atoms/layout/Flex'
import { cn } from '@/lib/cn'

export type NavbarBrandProps = HTMLAttributes<HTMLDivElement>

/**
 * Slot for the brand identity (logo, wordmark, or both). Renders as a flex row
 * so it does not shrink alongside the link list. Wrap the slot's content with
 * your router's `<Link>` (or a plain `<a>`) to make the brand clickable.
 */
export function NavbarBrand({ className, children, ...props }: NavbarBrandProps) {
  return (
    <Flex align="center" className={cn('shrink-0', className)} {...props}>
      {children}
    </Flex>
  )
}
