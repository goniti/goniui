'use client'

import type { HTMLAttributes, ReactNode } from 'react'

import { type BlockElement, Box } from '@/atoms/layout/Box'

export interface SkeletonGroupProps extends HTMLAttributes<HTMLElement> {
  as?: BlockElement
  children: ReactNode
  /** Screen-reader label while placeholders are shown — pass a translated string. */
  label: string
}

/**
 * Loading region wrapper. Sets `aria-busy="true"` while skeletons inside are
 * visible; individual {@link Skeleton} nodes stay `aria-hidden`.
 */
export function SkeletonGroup({ as, children, label, ...props }: SkeletonGroupProps) {
  return (
    <Box
      as={as}
      aria-busy="true"
      aria-label={label}
      data-slot="skeleton-group"
      role="status"
      {...props}
    >
      {children}
    </Box>
  )
}
