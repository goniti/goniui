import { tv, type VariantProps } from 'tailwind-variants'

export const spinnerVariants = tv({
  base: 'inline-flex shrink-0 items-center justify-center',
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    tone: {
      primary: '',
      muted: '',
      inverse: '',
      success: '',
    },
  },
  defaultVariants: { size: 'md', tone: 'primary' },
})

export type SpinnerStyleProps = VariantProps<typeof spinnerVariants>

/** Pixel size of each `size` (`size-4`, `size-6`, `size-8`), for layouts that reserve the space. */
export const spinnerSizePx = {
  sm: 16,
  md: 24,
  lg: 32,
} as const satisfies Record<NonNullable<SpinnerStyleProps['size']>, number>

/** CSS colour of each `tone`, read from the design tokens (for canvas or SVG consumers). */
export const spinnerToneColor = {
  primary: 'var(--color-primary-600)',
  muted: 'var(--color-foreground-muted)',
  inverse: 'var(--color-foreground-inverse)',
  success: 'var(--color-success)',
} as const satisfies Record<NonNullable<SpinnerStyleProps['tone']>, string>
