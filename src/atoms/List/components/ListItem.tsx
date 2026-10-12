'use client'

import { type HTMLAttributes, memo } from 'react'
import { tv } from 'tailwind-variants'

export const listItemVariants = tv({
  base: 'text-foreground',
})

export type ListItemProps = HTMLAttributes<HTMLLIElement>

export const ListItem = memo(function ListItem({ className, ...props }: ListItemProps) {
  return <li className={listItemVariants({ className })} {...props} />
})
