'use client'

import type { ReactNode } from 'react'

import { Box } from '@/atoms/layout/Box'
import { Flex } from '@/atoms/layout/Flex'
import { Text } from '@/atoms/Text'
import { cn } from '@/lib/cn'

export interface PageHeaderProps {
  /** Small uppercase label above the title (e.g. a section or breadcrumb). */
  eyebrow?: ReactNode
  /** The page's `<h1>`. */
  title: ReactNode
  /** Trailing content on the same row as the title (a date, actions…). */
  children?: ReactNode
  className?: string
}

/**
 * Generic page heading: an optional eyebrow above the `<h1>`, with a trailing
 * slot for whatever the page wants on that row (a date, a primary action…).
 * Domain-agnostic — the app supplies eyebrow/title/trailing content.
 */
export function PageHeader({ eyebrow, title, children, className }: PageHeaderProps) {
  return (
    <Flex align="start" justify="between" wrap="wrap" gap="md" className={cn(className)}>
      <Box>
        {eyebrow ? (
          <Text variant="caption" tone="muted" className="uppercase tracking-wide">
            {eyebrow}
          </Text>
        ) : null}
        <Text as="h1" variant="h1">
          {title}
        </Text>
      </Box>
      {children ? (
        <Flex align="center" gap="sm">
          {children}
        </Flex>
      ) : null}
    </Flex>
  )
}
