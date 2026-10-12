'use client'

import type { HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const skeletonVariants = tv({
  base: 'relative overflow-hidden bg-surface-2',
  variants: {
    variant: {
      /** Rectangular area — images, cards, buttons; size via `className`. */
      block: 'rounded-md',
      /** Text line — defaults to `h-4 w-full`; width via `className`. */
      text: 'block h-4 w-full rounded',
      /** Avatar / icon — size via `className` (e.g. `size-10`). */
      circle: 'rounded-full',
    },
  },
  defaultVariants: { variant: 'block' },
})

/** Shimmer bar — animated with `transform: translateX()` only (compositor-friendly). */
const skeletonShimmerClass =
  'pointer-events-none absolute inset-0 block w-full ' +
  // The sweep is drawn from the foreground token, so it contrasts with the
  // placeholder in both themes — a fixed light grey vanished in dark mode.
  'animate-skeleton-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent'

export type SkeletonElement = 'div' | 'span'

export interface SkeletonProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof skeletonVariants> {
  /** Block (`div`, default) or inline (`span`) placeholder. */
  as?: SkeletonElement
}

/**
 * Skeleton atom — visual loading placeholder with a left-to-right shimmer.
 * Always `aria-hidden`; wrap in {@link SkeletonGroup} so assistive tech gets
 * `aria-busy` + a live label on the loading region.
 */
export function Skeleton({ as, variant, className, ...props }: SkeletonProps) {
  const Tag = as ?? (variant === 'text' ? 'span' : 'div')

  return (
    <Tag
      aria-hidden
      data-slot="skeleton"
      className={skeletonVariants({ variant, className })}
      {...props}
    >
      <span aria-hidden className={skeletonShimmerClass} data-slot="skeleton-shimmer" />
    </Tag>
  )
}
