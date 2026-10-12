'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

export const segmentedControlVariants = tv({
  base:
    'flex w-full items-stretch gap-1 overflow-x-auto rounded-xl border border-border bg-surface-2 p-1 ' +
    '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
})

export type SegmentedControlProps = HTMLAttributes<HTMLDivElement>

/**
 * Segmented control container — a labelled group holding two or more
 * `SegmentedControl.Item` segments. Presentational and composition-based: the
 * segments (a static label, links, or buttons) come in as children. Give it an
 * `aria-label` describing the choice.
 */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl({ role = 'group', className, ...props }, ref) {
    return (
      <div ref={ref} role={role} className={segmentedControlVariants({ className })} {...props} />
    )
  }
)
