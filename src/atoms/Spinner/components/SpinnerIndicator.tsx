import { tv } from 'tailwind-variants'

import { type SpinnerStyleProps } from '../lib/spinner-config'

const indicatorVariants = tv({
  // A clip loader: a ring with one transparent side, spinning.
  base: 'inline-block animate-spin rounded-full border-2 border-b-transparent motion-reduce:animate-[spin_2s_linear_infinite]',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
    tone: {
      primary: 'border-primary-600 border-b-transparent',
      muted: 'border-foreground-muted border-b-transparent',
      inverse: 'border-foreground-inverse border-b-transparent',
      success: 'border-success border-b-transparent',
    },
  },
  defaultVariants: { size: 'md', tone: 'primary' },
})

export interface SpinnerIndicatorProps extends SpinnerStyleProps {
  /** When `false`, the indicator renders nothing. */
  loading?: boolean
}

/**
 * @internal The visual ring of {@link Spinner}; the a11y wrapper lives there.
 */
export function SpinnerIndicator({ size, tone, loading = true }: SpinnerIndicatorProps) {
  if (!loading) return null
  return <span aria-hidden className={indicatorVariants({ size, tone })} />
}
