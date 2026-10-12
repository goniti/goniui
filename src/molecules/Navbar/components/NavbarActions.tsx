'use client'

import type { HTMLAttributes } from 'react'

import { Flex } from '@/atoms/layout/Flex'
import { cn } from '@/lib/cn'

export type NavbarActionsProps = HTMLAttributes<HTMLDivElement>

/**
 * Slot for action controls on the trailing edge of the navbar (e.g. Sign in /
 * Sign up buttons, a theme toggle, a user avatar). Renders as a flex row so
 * buttons stay aligned without extra wrappers.
 */
export function NavbarActions({ className, children, ...props }: NavbarActionsProps) {
  return (
    <Flex align="center" gap="md" className={cn('shrink-0', className)} {...props}>
      {children}
    </Flex>
  )
}
