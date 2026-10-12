'use client'

import type { HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/cn'

import type { BlockElement } from './Box'

export const gridVariants = tv({
  base: 'grid',
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
      '2xl': 'gap-8',
    },
    place: {
      start: 'place-items-start',
      center: 'place-items-center',
      end: 'place-items-end',
      stretch: 'place-items-stretch',
    },
  },
})

export type GridColumnCount = 1 | 2 | 3 | 4 | 5 | 6

/**
 * Column count per breakpoint. `base` applies from the smallest screen up;
 * every other key overrides it from that breakpoint onwards.
 */
export interface ResponsiveGridColumns {
  base: GridColumnCount
  sm?: GridColumnCount
  md?: GridColumnCount
  lg?: GridColumnCount
  xl?: GridColumnCount
}

// Spelled out rather than composed at runtime: Tailwind v4 scans source files
// for literal class names, so `\`${prefix}:grid-cols-${n}\`` would never make it
// into the stylesheet.
const COLUMN_CLASSES: Record<keyof ResponsiveGridColumns, Record<GridColumnCount, string>> = {
  base: {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  },
  sm: {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6',
  },
  md: {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
  },
  lg: {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
  },
  xl: {
    1: 'xl:grid-cols-1',
    2: 'xl:grid-cols-2',
    3: 'xl:grid-cols-3',
    4: 'xl:grid-cols-4',
    5: 'xl:grid-cols-5',
    6: 'xl:grid-cols-6',
  },
}

const BREAKPOINT_ORDER = ['base', 'sm', 'md', 'lg', 'xl'] as const

function resolveColumnClasses(cols: ResponsiveGridColumns): string {
  return BREAKPOINT_ORDER.filter((breakpoint) => cols[breakpoint] != null)
    .map((breakpoint) => COLUMN_CLASSES[breakpoint][cols[breakpoint] as GridColumnCount])
    .join(' ')
}

export interface GridProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof gridVariants> {
  /**
   * The semantic HTML block element to render. Defaults to `div`.
   * Use `as="section"`, `as="main"`, etc. to give the container its correct
   * role in the document outline.
   */
  as?: BlockElement
  /**
   * Columns per breakpoint, mobile-first: `{ base: 1, sm: 2, lg: 4 }`.
   * `base` is required so a grid can never ship without a mobile layout.
   */
  cols?: ResponsiveGridColumns
}

/**
 * Polymorphic grid container. `cols` is mobile-first by construction — it takes
 * a column count per breakpoint rather than a single number, so a grid cannot
 * silently stay at N columns on a 320px screen. `gap` and `place` cover the
 * other high-value variants; `className` is the escape hatch for one-off
 * utilities (`flex-1`, `px-6`, …) that don't warrant a variant.
 *
 * Not `forwardRef`'d: the polymorphic `as` makes a single ref type unsound —
 * the documented exception for layout/typography primitives.
 */
export function Grid({ as: Tag = 'div', cols, gap, place, className, ...props }: GridProps) {
  return (
    <Tag
      className={cn(gridVariants({ gap, place }), cols && resolveColumnClasses(cols), className)}
      {...props}
    />
  )
}
