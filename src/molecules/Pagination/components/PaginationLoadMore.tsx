'use client'

import { Loader2 } from 'lucide-react'

import { Button, type ButtonProps } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import { Flex } from '@/atoms/layout/Flex'
import { cn } from '@/lib/cn'

export interface PaginationLoadMoreProps {
  /** Called when the user clicks the button. */
  onClick: () => void
  /** When true, the button shows a spinner and is disabled. */
  loading?: boolean
  /** Button label. */
  label?: string
  /** Hide the button when there are no more items to load. */
  hasMore?: boolean
  className?: string
  variant?: ButtonProps['variant']
}

/**
 * Load-more button for cursor-based or infinite pagination.
 * Standalone (no `Pagination.Root` needed). Renders nothing when `hasMore` is `false`.
 */
export function PaginationLoadMore({
  onClick,
  loading = false,
  label = 'Load more',
  hasMore = true,
  className,
  variant = 'secondary',
}: PaginationLoadMoreProps) {
  if (!hasMore) return null

  return (
    <Flex justify="center" className={cn('mt-8', className)}>
      <Button variant={variant} onClick={onClick} disabled={loading}>
        {loading && <Icon icon={Loader2} size="sm" className="animate-spin" aria-hidden />}
        {label}
      </Button>
    </Flex>
  )
}
