'use client'

import { forwardRef, type HTMLAttributes } from 'react'

import { type SpinnerStyleProps, spinnerVariants } from '../lib/spinner-config'
import { SpinnerIndicator } from './SpinnerIndicator'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement>, SpinnerStyleProps {
  /** Accessible label announced to screen readers. Pass a translated string. */
  'aria-label'?: string
  /** When `false`, nothing is rendered. Defaults to `true`. */
  loading?: boolean
}

/**
 * Spinner atom — loading indicator with a11y wrapper.
 * The visual ring is {@link SpinnerIndicator} (single swap point for the visual).
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size, tone, loading = true, className, 'aria-label': ariaLabel = 'Loading…', ...props },
  ref
) {
  if (!loading) return null

  return (
    <span
      ref={ref}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      data-slot="spinner"
      className={spinnerVariants({ size, tone, className })}
      {...props}
    >
      <SpinnerIndicator loading={loading} size={size} tone={tone} />
    </span>
  )
})
