'use client'

import { type ElementRef, forwardRef } from 'react'

import type { IconProps } from '@/atoms/Icon'

import { StarRatingDisplay } from './StarRatingDisplay'
import { StarRatingInteractive } from './StarRatingInteractive'

const DEFAULT_MAX = 5

interface StarRatingBaseProps {
  /** Current value, 0–`max`. Read-only mode accepts a fractional average (e.g. 4.2). */
  value: number
  /** Total number of stars. */
  max?: number
  size?: IconProps['size']
  className?: string
  /** Accessible name for the whole control — e.g. "4.2 sur 5" or "Rate this game". */
  label: string
}

export interface StarRatingReadOnlyProps extends StarRatingBaseProps {
  onRate?: undefined
}

export interface StarRatingInteractiveProps extends StarRatingBaseProps {
  /** Submits the picked value (1..`max`); providing this prop makes the control interactive. */
  onRate: (value: number) => void
  /** Accessible name for each star value, e.g. ["1 star", "2 stars", …]. */
  starLabels: string[]
  disabled?: boolean
}

export type StarRatingProps = StarRatingReadOnlyProps | StarRatingInteractiveProps

function isInteractive(props: StarRatingProps): props is StarRatingInteractiveProps {
  return typeof props.onRate === 'function'
}

/**
 * Star rating atom.
 * - Read-only (no `onRate`): a static `role="img"` display of `value`/`max`,
 *   filled/half/empty stars.
 * - Interactive (`onRate` provided): a Radix `RadioGroup` of `max` stars —
 *   click or arrow keys to pick 1..max.
 */
export const StarRating = forwardRef<ElementRef<'div'>, StarRatingProps>(
  function StarRating(props, ref) {
    const { value, max = DEFAULT_MAX, size, label, className } = props

    if (isInteractive(props)) {
      return (
        <StarRatingInteractive
          ref={ref}
          value={value}
          max={max}
          size={size}
          label={label}
          starLabels={props.starLabels}
          onRate={props.onRate}
          disabled={props.disabled}
          className={className}
        />
      )
    }

    return (
      <StarRatingDisplay
        ref={ref}
        value={value}
        max={max}
        size={size}
        label={label}
        className={className}
      />
    )
  }
)
