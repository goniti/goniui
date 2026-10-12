'use client'

import { type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Flex } from '@/atoms/layout/Flex'
import { Text, type TextProps } from '@/atoms/Text'

// Map the countdown size to the Text variant that drives the number's typography.
const NUMBER_TEXT_VARIANT = {
  sm: 'h2',
  md: 'h1',
  lg: 'display',
} as const satisfies Record<string, TextProps['variant']>

export const countdownUnitVariants = tv({
  slots: {
    root: '',
    number: 'tabular-nums',
  },
  variants: {
    size: {
      sm: { root: 'gap-0.5', number: '' },
      md: { root: 'gap-1', number: '' },
      lg: { root: 'gap-1.5', number: '' },
    },
  },
  defaultVariants: { size: 'md' },
})

export interface CountdownUnitProps extends VariantProps<typeof countdownUnitVariants> {
  /** The numeric value to display (0–99). */
  value: number
  /** Human-readable label supplied by the caller — already translated. */
  label: ReactNode
  className?: string
}

/** Renders a single time unit (e.g. "07 hours"). Presentational — no logic. */
export function CountdownUnit({ value, label, size = 'md', className }: CountdownUnitProps) {
  const styles = countdownUnitVariants({ size })
  const formatted = String(value).padStart(2, '0')

  return (
    <Flex direction="col" align="center" className={styles.root({ className })}>
      <Text as="span" variant={NUMBER_TEXT_VARIANT[size ?? 'md']} className={styles.number()}>
        {formatted}
      </Text>
      <Text as="span" variant="caption" tone="muted">
        {label}
      </Text>
    </Flex>
  )
}
