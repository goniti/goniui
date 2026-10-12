'use client'

import type { HTMLAttributes } from 'react'

import { Flex } from '@/atoms/layout/Flex'
import { cn } from '@/lib/cn'

export type SidebarFooterProps = HTMLAttributes<HTMLDivElement>

/**
 * Bottom slot of the sidebar — pushed to the bottom edge. Houses the display-mode
 * control (added later) and the user/account area.
 */
export function SidebarFooter({ className, children, ...props }: SidebarFooterProps) {
  return (
    <Flex direction="col" gap="xs" className={cn('mt-auto shrink-0 pt-2', className)} {...props}>
      {children}
    </Flex>
  )
}
