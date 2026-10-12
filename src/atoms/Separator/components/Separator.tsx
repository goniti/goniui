'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { SeparatorRoot } from './SeparatorRoot'

export const separatorVariants = tv({
  base: 'shrink-0 bg-border',
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
})

export interface SeparatorProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof separatorVariants> {
  /**
   * When `true` (default), the line is purely visual (`role="none"`). When
   * `false`, exposes `role="separator"` for assistive tech.
   */
  decorative?: boolean
}

/** Visual divider atom — Radix Separator primitive for a11y; styling via `tv`. */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = 'horizontal', decorative = true, className, ...props },
  ref
) {
  return (
    <SeparatorRoot
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      data-slot="separator"
      className={separatorVariants({ orientation, className })}
      {...props}
    />
  )
})
