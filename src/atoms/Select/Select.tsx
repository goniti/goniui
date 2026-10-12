'use client'

import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { Icon } from '@/atoms/Icon'
import { Box } from '@/atoms/layout/Box'

import { SelectRoot, type SelectRootProps } from './SelectRoot'

export const selectVariants = tv({
  base:
    'w-full appearance-none rounded-lg border bg-surface py-2.5 pl-3.5 pr-10 text-base text-foreground ' +
    'transition focus:outline-none focus:ring-2 disabled:opacity-50 md:text-sm',
  variants: {
    state: {
      default: 'border-border focus:border-primary-400 focus:ring-primary-400/25',
      error: 'border-error focus:border-error focus:ring-error/25',
    },
  },
  defaultVariants: { state: 'default' },
})

export interface SelectProps extends SelectRootProps, VariantProps<typeof selectVariants> {}

/**
 * Native `<select>` — the best a11y a fixed choice gets on mobile (system
 * picker), no ARIA to hand-roll. Same token family as `Input`/`Textarea`.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { state, className, ...props },
  ref
) {
  return (
    <Box className="relative">
      <SelectRoot ref={ref} className={selectVariants({ state, className })} {...props} />
      <Icon
        icon={ChevronDown}
        size="sm"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted"
      />
    </Box>
  )
})
Select.displayName = 'Select'
