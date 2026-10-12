'use client'

import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export type SidebarGroupProps = HTMLAttributes<HTMLUListElement>

/** Semantic `<ul>` list of `Sidebar.Item`s. Pair with a `Sidebar.GroupLabel`. */
export const SidebarGroup = forwardRef<HTMLUListElement, SidebarGroupProps>(function SidebarGroup(
  { className, children, ...props },
  ref
) {
  return (
    <ul ref={ref} role="list" className={cn('flex flex-col gap-0.5', className)} {...props}>
      {children}
    </ul>
  )
})
