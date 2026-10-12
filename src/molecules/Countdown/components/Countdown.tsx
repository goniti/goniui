'use client'

import { type HTMLAttributes, type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Flex } from '@/atoms/layout/Flex'

import { useCountdown } from '../hooks/useCountdown'
import { CountdownUnit } from './CountdownUnit'

// ─── Variants ────────────────────────────────────────────────────────────────

export const countdownVariants = tv({
  base: 'inline-flex items-center',
  variants: {
    size: {
      sm: 'gap-3',
      md: 'gap-5',
      lg: 'gap-7',
    },
  },
  defaultVariants: { size: 'md' },
})

// ─── Types ───────────────────────────────────────────────────────────────────

/** Which time units the countdown should display. */
export type CountdownFormat = ReadonlyArray<'days' | 'hours' | 'minutes' | 'seconds'>

/** Labels for each rendered unit — supplied by the caller for i18n. */
export interface CountdownLabels {
  days?: ReactNode
  hours?: ReactNode
  minutes?: ReactNode
  seconds?: ReactNode
  /** Announced to screen-readers when the countdown reaches zero. */
  expired?: ReactNode
}

export interface CountdownProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof countdownVariants> {
  /**
   * A future `Date` **or** the number of **seconds** remaining.
   * - `Date` → anchored to wall-clock time.
   * - `number` → countdown starts from that many seconds at mount.
   */
  target: Date | number
  /**
   * Which units to display, in order.
   * @default ['days', 'hours', 'minutes', 'seconds']
   */
  format?: CountdownFormat
  /**
   * Labels rendered below each unit — caller is responsible for i18n.
   * Falls back to English abbreviations when omitted (for ease of use in
   * stories / tests where literal strings are acceptable).
   */
  labels?: CountdownLabels
  /** Rendered in place of the units once the countdown expires. */
  expiredSlot?: ReactNode
}

// ─── Default labels (dev/story fallback — never ship hardcoded copy) ─────────

const DEFAULT_LABELS: Required<CountdownLabels> = {
  days: 'days',
  hours: 'hrs',
  minutes: 'min',
  seconds: 'sec',
  expired: 'Time is up',
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Generic countdown display molecule. Ticks every second via `useCountdown`.
 *
 * A11y: the wrapper carries `aria-live="polite"` so assistive technology
 * announces time updates without interrupting the user. When the timer expires
 * the wrapper announces the expiry message. Colour is never the only indicator.
 *
 * Copy: all labels are props (i18n is the caller's responsibility). The
 * fallback English strings are for stories/tests only.
 */
export function Countdown({
  target,
  format = ['days', 'hours', 'minutes', 'seconds'],
  labels,
  expiredSlot,
  size,
  className,
  ...rest
}: CountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(target)
  const resolvedLabels = { ...DEFAULT_LABELS, ...labels }

  const values: Record<string, number> = { days, hours, minutes, seconds }

  if (isExpired) {
    return (
      <Flex
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={countdownVariants({ size, className })}
        {...rest}
      >
        {expiredSlot ?? <span>{resolvedLabels.expired}</span>}
      </Flex>
    )
  }

  return (
    <Flex
      aria-live="polite"
      aria-atomic="true"
      className={countdownVariants({ size, className })}
      {...rest}
    >
      {format.map((unit) => (
        <CountdownUnit
          key={unit}
          value={values[unit] ?? 0}
          label={resolvedLabels[unit]}
          size={size ?? 'md'}
        />
      ))}
    </Flex>
  )
}
