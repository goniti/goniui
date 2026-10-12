'use client'

import { forwardRef } from 'react'

import { Text } from '@/atoms/Text'
import { cn } from '@/lib/cn'

import { ProgressRoot } from './ProgressRoot'

type ProgressSize = 'sm' | 'md' | 'lg'
type ProgressTone = 'primary' | 'success' | 'warning' | 'error'

// Diameter + stroke per size (px). The ring scales with the bar's size scale.
const DIMENSIONS: Record<ProgressSize, { diameter: number; stroke: number }> = {
  sm: { diameter: 36, stroke: 4 },
  md: { diameter: 56, stroke: 5 },
  lg: { diameter: 80, stroke: 6 },
}

const TONE_STROKE: Record<ProgressTone, string> = {
  primary: 'stroke-primary-600',
  success: 'stroke-success',
  warning: 'stroke-warning',
  error: 'stroke-error',
}

export interface ProgressCircleProps {
  value?: number
  size?: ProgressSize
  tone?: ProgressTone
  indeterminate?: boolean
  showValue?: boolean
  label?: string
  className?: string
}

/**
 * @internal Circular variant of Progress — a stroked SVG ring driven by
 * `stroke-dashoffset`. Wrapped in `ProgressRoot` (Radix) so it keeps the
 * `progressbar` role and aria-value semantics. Public surface is `Progress`
 * with `shape="circular"`.
 */
export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
  function ProgressCircle(
    { value, size = 'md', tone = 'primary', indeterminate, showValue, label, className, ...props },
    ref
  ) {
    const { diameter, stroke } = DIMENSIONS[size]
    const radius = (diameter - stroke) / 2
    const circumference = 2 * Math.PI * radius
    const pct = value ?? 0
    const dashOffset = indeterminate ? circumference * 0.75 : circumference * (1 - pct / 100)
    const center = diameter / 2

    return (
      <ProgressRoot
        ref={ref}
        value={indeterminate ? null : pct}
        max={100}
        aria-label={label}
        data-slot="progress"
        data-indeterminate={indeterminate || undefined}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: diameter, height: diameter }}
        {...props}
      >
        <svg
          width={diameter}
          height={diameter}
          className={indeterminate ? 'animate-progress-spin' : undefined}
          style={indeterminate ? undefined : { transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            className="stroke-foreground/15"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={cn(
              TONE_STROKE[tone],
              !indeterminate && 'transition-[stroke-dashoffset] duration-300 ease-in-out'
            )}
          />
        </svg>
        {showValue && !indeterminate ? (
          <Text variant="caption" tone="muted" className="absolute tabular-nums">
            {Math.round(pct)}%
          </Text>
        ) : null}
      </ProgressRoot>
    )
  }
)
