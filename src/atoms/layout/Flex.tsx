'use client'

import type { HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import type { BlockElement } from './Box'

export const flexVariants = tv({
  base: 'flex',
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col',
      rowReverse: 'flex-row-reverse',
      colReverse: 'flex-col-reverse',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
      '2xl': 'gap-8',
    },
  },
  defaultVariants: {
    direction: 'row',
  },
})

export interface FlexProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof flexVariants> {
  /**
   * The semantic HTML block element to render. Defaults to `div`.
   * Use `as="section"`, `as="main"`, etc. to give the container its correct
   * role in the document outline.
   */
  as?: BlockElement
}

/**
 * Polymorphic flex container. `direction`, `align`, `justify`, `wrap`, `gap`
 * cover the high-value layout variants; `className` is the escape hatch for
 * one-off sizing/positioning utilities that don't warrant a variant (`w-full`,
 * `min-h-screen`, `absolute`, …).
 *
 * Not `forwardRef`'d: the polymorphic `as` makes a single ref type unsound —
 * the documented exception for layout/typography primitives.
 */
export function Flex({
  as: Tag = 'div',
  direction,
  align,
  justify,
  wrap,
  gap,
  className,
  ...props
}: FlexProps) {
  return (
    <Tag className={flexVariants({ direction, align, justify, wrap, gap, className })} {...props} />
  )
}
