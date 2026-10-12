'use client'

import type { ReactNode } from 'react'

import { Flex } from '@/atoms/layout/Flex'
import { Text } from '@/atoms/Text'
import { cn } from '@/lib/cn'

export interface EmptyStateProps {
  /** Decorative icon (e.g. `<Icon icon={Inbox} size="lg" />`). Purely visual. */
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  /** Trailing slot for an action (e.g. a `<Button>`). */
  children?: ReactNode
  className?: string
}

/**
 * Generic empty/placeholder state: an icon, a title, an optional description,
 * and an optional action slot — centered. Domain-agnostic; the app supplies
 * the copy and the icon.
 */
export function EmptyState({ icon, title, description, children, className }: EmptyStateProps) {
  return (
    <Flex
      direction="col"
      align="center"
      justify="center"
      gap="sm"
      className={cn('rounded-xl border border-dashed border-border p-12 text-center', className)}
    >
      {icon ? (
        <Flex
          align="center"
          justify="center"
          className="size-12 rounded-full bg-surface-2 text-foreground-muted"
        >
          {icon}
        </Flex>
      ) : null}
      <Text as="h2" variant="h3">
        {title}
      </Text>
      {description ? (
        <Text variant="body" tone="muted" className="max-w-sm">
          {description}
        </Text>
      ) : null}
      {children ? (
        <Flex align="center" gap="sm" className="mt-2">
          {children}
        </Flex>
      ) : null}
    </Flex>
  )
}
