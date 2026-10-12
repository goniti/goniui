'use client'

import type { HTMLAttributes } from 'react'

import { Flex } from '@/atoms/layout/Flex'
import { cn } from '@/lib/cn'

export type SidebarHeaderProps = HTMLAttributes<HTMLDivElement>

/**
 * Top slot of the sidebar — brand, org switcher, or workspace selector. Fixed
 * height (`h-12`) so it never shifts the items below when its content changes
 * between display modes (e.g. wordmark + badge expanded vs. monogram
 * collapsed) — `overflow-hidden` guarantees a taller expanded content never
 * grows the header.
 */
export function SidebarHeader({ className, children, ...props }: SidebarHeaderProps) {
  return (
    <Flex
      align="center"
      gap="sm"
      className={cn('h-12 shrink-0 overflow-hidden px-1', className)}
      {...props}
    >
      {children}
    </Flex>
  )
}
