'use client'

import { Check, X } from 'lucide-react'
import { type HTMLAttributes, type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Icon } from '@/atoms/Icon'
import { cn } from '@/lib/cn'

export interface PasswordRule {
  id: string
  /** The label rendered in the checklist row. Supplied by the caller (i18n concern). */
  label: ReactNode
  test: (v: string) => boolean
}

export interface PasswordStrengthMeterProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  /** The current password value — drives rule evaluation live. */
  value: string
  /** Ordered list of rules to evaluate and display. */
  rules: PasswordRule[]
}

// ─── Variants ────────────────────────────────────────────────────────────────

const segmentVariants = tv({
  base: 'h-1.5 flex-1 rounded-full transition-colors duration-200',
  variants: {
    met: {
      true: 'bg-primary-400',
      false: 'bg-foreground/15',
    },
  },
  defaultVariants: { met: false },
})

const rowIconVariants = tv({
  base: '',
  variants: {
    met: {
      true: 'text-primary-700 dark:text-primary-400',
      false: 'text-foreground-muted',
    },
  },
  defaultVariants: { met: false },
})

type SegmentMet = VariantProps<typeof segmentVariants>['met']
type RowIconMet = VariantProps<typeof rowIconVariants>['met']

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Generic, label-free password strength meter. Renders:
 *   1. A segmented progress bar — one segment per rule, filled (primary) when
 *      the rule is met.
 *   2. A live checklist — each rule as a row with a met/unmet icon + its label.
 *
 * Labels are supplied via the `rules` prop; the component carries zero copy
 * (i18n is the caller's responsibility).
 *
 * A11y: colour is never the sole indicator — each icon carries aria-label
 * "met"/"unmet". The bar is aria-hidden (purely decorative duplication of the
 * list). The checklist is wrapped in aria-live="polite" so assistive technology
 * announces updates as the user types.
 */
export function PasswordStrengthMeter({
  value,
  rules,
  className,
  ...rest
}: PasswordStrengthMeterProps) {
  const results = rules.map((rule) => ({ ...rule, passed: rule.test(value) }))

  return (
    <div className={cn('flex flex-col gap-3', className)} {...rest}>
      {/* Segmented progress bar — aria-hidden, the list below is the a11y source of truth */}
      <div className="flex gap-1" aria-hidden="true">
        {results.map(({ id, passed }) => (
          <div
            key={id}
            data-testid="psm-segment"
            data-met={passed ? 'true' : 'false'}
            className={segmentVariants({ met: passed as SegmentMet })}
          />
        ))}
      </div>

      {/* Rule checklist — live region so SR users hear changes while typing */}
      <ul role="list" aria-live="polite" aria-atomic="false" className="flex flex-col gap-1">
        {results.map(({ id, passed, label }) => (
          <li key={id} className="flex items-center gap-2 text-sm">
            <Icon
              icon={passed ? Check : X}
              size="sm"
              className={rowIconVariants({ met: passed as RowIconMet })}
              aria-label={passed ? 'met' : 'unmet'}
            />
            <span
              className={cn(
                'text-foreground',
                passed && 'font-medium text-primary-700 dark:text-primary-400'
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
