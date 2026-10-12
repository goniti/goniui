'use client'

import { X } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Icon } from '@/atoms/Icon'

export const badgeVariants = tv({
  base: 'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
  variants: {
    variant: {
      solid: 'bg-primary-400 text-primary-foreground',
      outline: 'border border-border text-foreground-muted',
    },
  },
  defaultVariants: { variant: 'outline' },
})

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Renders a dismiss (×) button after the label. Omit for a non-removable badge. */
  onRemove?: () => void
  /** Accessible name for the dismiss button — supplied by the app (§10). */
  removeLabel?: string
}

/** Small pill label — `solid` for an active/selected state, `outline` otherwise. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant, className, children, onRemove, removeLabel, ...props },
  ref
) {
  return (
    <span ref={ref} className={badgeVariants({ variant, className })} {...props}>
      {children}
      {onRemove ? (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className="inline-flex items-center rounded-full hover:bg-black/10"
        >
          <Icon icon={X} className="h-3 w-3 max-w-none" />
        </button>
      ) : null}
    </span>
  )
})
