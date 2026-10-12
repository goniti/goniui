'use client'

import { type HTMLAttributes, useContext } from 'react'

import { Flex } from '@/atoms/layout/Flex'
import { Separator } from '@/atoms/Separator'
import { Text } from '@/atoms/Text'
import { cn } from '@/lib/cn'

import { SidebarContext } from '../SidebarContext'

export type SidebarGroupLabelProps = HTMLAttributes<HTMLDivElement>

/**
 * Small heading above a `Sidebar.Group` (e.g. "Organization"). Fixed height
 * (`h-8`) in both display modes so the group below never shifts when the
 * sidebar collapses (regression #1150): collapsed, the text is replaced
 * visually by a thin separator, but stays in the DOM (`sr-only`) so screen
 * reader users still get the grouping context in icon-only mode; the
 * separator itself is decorative (`role="none"`), so it isn't announced too.
 * The text never wraps: `expanded` flips before the rail's width animation
 * ends, so a wrapping label would briefly grow to two lines and push the
 * group below down, then back up.
 */
export function SidebarGroupLabel({ className, children, ...props }: SidebarGroupLabelProps) {
  // Default to expanded when used outside Sidebar.Root (e.g. in isolation).
  const sidebar = useContext(SidebarContext)
  const expanded = sidebar?.expanded ?? true

  return (
    <Flex align="center" className={cn('h-8 shrink-0 overflow-hidden px-3', className)} {...props}>
      <Text
        variant="caption"
        className={cn('min-w-0 truncate font-medium', !expanded && 'sr-only')}
      >
        {children}
      </Text>
      {!expanded && <Separator className="w-full" />}
    </Flex>
  )
}
