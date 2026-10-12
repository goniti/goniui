'use client'

import type { HTMLAttributes } from 'react'

import { Card } from '@/atoms/Card'
import { cn } from '@/lib/cn'

export type FAQRootProps = HTMLAttributes<HTMLDivElement>

/**
 * Container for FAQ accordion items — a styled card shell. Compose items as
 * children; copy and layout around the block stay in the app layer.
 */
export function FAQRoot({ className, children, ...props }: FAQRootProps) {
  return (
    <Card
      className={cn('shadow-lg [&>*:last-child>[data-slot=separator]]:hidden', className)}
      {...props}
    >
      {children}
    </Card>
  )
}
