'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Box } from '@/atoms/layout/Box'
import { Flex } from '@/atoms/layout/Flex'
import { Text } from '@/atoms/Text'

import { ProgressCircle } from './ProgressCircle'
import { ProgressIndicator } from './ProgressIndicator'
import { ProgressRoot } from './ProgressRoot'

export const progressVariants = tv({
  slots: {
    root: 'relative w-full overflow-hidden rounded-full bg-foreground/15',
    indicator: 'h-full w-full flex-1 rounded-full transition-all duration-300 ease-in-out',
  },
  variants: {
    size: {
      sm: { root: 'h-1.5' },
      md: { root: 'h-2.5' },
      lg: { root: 'h-4' },
    },
    tone: {
      primary: { indicator: 'bg-primary-400' },
      success: { indicator: 'bg-success' },
      warning: { indicator: 'bg-warning' },
      error: { indicator: 'bg-error' },
    },
    indeterminate: {
      true: { indicator: 'animate-indeterminate-progress w-2/5' },
      false: {},
    },
  },
  defaultVariants: { size: 'md', tone: 'primary', indeterminate: false },
})

export type ProgressShape = 'linear' | 'circular'

export interface ProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof progressVariants> {
  /**
   * Current progress value (0–100). Omit or set `indeterminate` to `true`
   * for an animated indeterminate bar.
   */
  value?: number
  /** Accessible label describing what is loading. */
  label?: string
  /** Linear bar (default) or a circular ring. */
  shape?: ProgressShape
  /** Render the numeric percentage (determinate only — beside the bar / inside the ring). */
  showValue?: boolean
}

/**
 * Progress atom. Radix Progress primitive for a11y; styling via `tv`. Determinate
 * mode moves the indicator (translateX for the bar, stroke-dashoffset for the
 * ring); `indeterminate` animates it. `shape="circular"` delegates to
 * `ProgressCircle`; `showValue` shows the percentage.
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    value,
    size,
    tone,
    indeterminate: indeterminateProp,
    label,
    shape = 'linear',
    showValue,
    className,
    ...props
  },
  ref
) {
  const isIndeterminate = indeterminateProp ?? value === undefined
  const clampedValue = value !== undefined ? Math.min(100, Math.max(0, value)) : undefined
  const showPct = Boolean(showValue) && !isIndeterminate

  if (shape === 'circular') {
    return (
      <ProgressCircle
        ref={ref}
        value={clampedValue}
        size={size}
        tone={tone}
        indeterminate={isIndeterminate}
        showValue={showPct}
        label={label}
        className={className}
        {...props}
      />
    )
  }

  const { root, indicator } = progressVariants({ size, tone, indeterminate: isIndeterminate })

  const bar = (
    <ProgressRoot
      ref={ref}
      value={isIndeterminate ? null : clampedValue}
      max={100}
      aria-label={label}
      data-slot="progress"
      data-indeterminate={isIndeterminate || undefined}
      className={root({ className: showPct ? undefined : className })}
      {...(showPct ? {} : props)}
    >
      <ProgressIndicator
        data-slot="progress-indicator"
        className={indicator()}
        style={
          isIndeterminate ? undefined : { transform: `translateX(-${100 - (clampedValue ?? 0)}%)` }
        }
      />
    </ProgressRoot>
  )

  if (!showPct) return bar

  return (
    <Flex align="center" gap="sm" className={className} {...props}>
      <Box className="flex-1">{bar}</Box>
      <Text variant="caption" tone="muted" className="tabular-nums">
        {clampedValue}%
      </Text>
    </Flex>
  )
})
