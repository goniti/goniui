'use client'

import { type HTMLAttributes, type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const listRootVariants = tv({
  base: 'flex flex-col',
  variants: {
    marker: {
      disc: 'list-disc pl-5',
      decimal: 'list-decimal pl-5',
      none: 'list-none',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
  },
  defaultVariants: { marker: 'none', gap: 'none' },
})

export interface ListRootProps
  extends
    Omit<HTMLAttributes<HTMLUListElement>, 'children'>,
    VariantProps<typeof listRootVariants> {
  as?: 'ul' | 'ol'
  children?: ReactNode
}

// Not forwardRef'd — polymorphic `as` (ul/ol) makes a single ref type unsound.
// Same documented exception as Box, Flex, Grid, Text.
export function ListRoot({
  as: Tag = 'ul',
  marker,
  gap,
  className,
  children,
  ...props
}: ListRootProps) {
  return (
    <Tag
      className={listRootVariants({ marker, gap, className })}
      {...(props as HTMLAttributes<HTMLUListElement | HTMLOListElement>)}
    >
      {children}
    </Tag>
  )
}
