'use client'

import type { ReactNode } from 'react'

import { Text } from '@/atoms/Text'

import { usePaginationContext } from '../PaginationContext'

export interface PaginationRange {
  /** First item index shown on the current page (1-based; 0 when empty). */
  from: number
  /** Last item index shown on the current page. */
  to: number
  /** Total number of items across all pages. */
  total: number
}

export interface PaginationInfoProps {
  /** Items per page — used with the context `page` to compute the range. */
  pageSize: number
  /** Total number of items across all pages. */
  totalItems: number
  /** Renders the copy from the computed range (keeps wording in the app for i18n). */
  children: (range: PaginationRange) => ReactNode
  className?: string
}

/**
 * Range summary ("Showing 1–20 of 150"). Presentational: it computes the range
 * and hands it to `children` — the caller owns the wording (never hardcoded here).
 */
export function PaginationInfo({ pageSize, totalItems, children, className }: PaginationInfoProps) {
  const { page } = usePaginationContext()
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)

  return (
    <Text variant="caption" className={className}>
      {children({ from, to, total: totalItems })}
    </Text>
  )
}
