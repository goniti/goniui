'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/atoms/Button'
import { Flex } from '@/atoms/layout/Flex'
import { Text } from '@/atoms/Text'

export interface CalendarHeaderProps {
  /** Formatted month + year label rendered in the centre, e.g. "June 2026". */
  label: string
  /** Accessible label for the previous-month button (passed in for i18n). */
  prevLabel: string
  /** Accessible label for the next-month button (passed in for i18n). */
  nextLabel: string
  onPrev: () => void
  onNext: () => void
  /** Disable when the view sits at the min bound (no earlier month allowed). */
  prevDisabled?: boolean
  /** Disable when the view sits at the max bound (no later month allowed). */
  nextDisabled?: boolean
}

/** Month/year navigation bar for CalendarRoot. Internal subcomponent — not in the public index. */
export function CalendarHeader({
  label,
  prevLabel,
  nextLabel,
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
}: CalendarHeaderProps) {
  return (
    <Flex align="center" justify="between" className="px-1 pb-3">
      <Button
        variant="ghost"
        size="sm"
        aria-label={prevLabel}
        onClick={onPrev}
        disabled={prevDisabled}
        className="h-7 w-7 p-0 disabled:pointer-events-auto disabled:cursor-not-allowed"
      >
        <ChevronLeft aria-hidden className="h-4 w-4" />
      </Button>
      <Text as="span" variant="label" className="font-semibold capitalize">
        {label}
      </Text>
      <Button
        variant="ghost"
        size="sm"
        aria-label={nextLabel}
        onClick={onNext}
        disabled={nextDisabled}
        className="h-7 w-7 p-0 disabled:pointer-events-auto disabled:cursor-not-allowed"
      >
        <ChevronRight aria-hidden className="h-4 w-4" />
      </Button>
    </Flex>
  )
}
