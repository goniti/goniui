'use client'

import { CalendarIcon } from 'lucide-react'

import { Button } from '@/atoms/Button'
import { inputVariants } from '@/atoms/Input'
import { cn } from '@/lib/cn'
import { PopoverTrigger } from '@/molecules/Popover/components/PopoverTrigger'

import { useDateCalendarContext } from '../DateCalendarContext'

export interface DateCalendarTriggerProps {
  ariaLabel: string
  className?: string
  disabled?: boolean
}

/** Input-styled trigger for `DateCalendar`. */
export function DateCalendarTrigger({ ariaLabel, className, disabled }: DateCalendarTriggerProps) {
  const { formattedValue, placeholder } = useDateCalendarContext()

  return (
    <PopoverTrigger asChild>
      <Button
        variant="unstyled"
        size="none"
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        disabled={disabled}
        className={inputVariants({
          className: cn(
            'justify-between text-left',
            !formattedValue && 'text-foreground-muted',
            className
          ),
        })}
      >
        <span className="flex-1 px-3.5 py-2.5 text-sm">{formattedValue || placeholder}</span>
        <span aria-hidden className="pr-3 text-foreground-muted">
          <CalendarIcon className="h-4 w-4" />
        </span>
      </Button>
    </PopoverTrigger>
  )
}
