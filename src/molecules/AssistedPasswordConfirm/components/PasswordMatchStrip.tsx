import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/cn'

export type CharMatchStatus = 'empty' | 'match' | 'mismatch'

/**
 * Per-character comparison of a confirm value against the target password.
 * One status per character of `password`: `match` when the confirm has the same
 * character at that position, `mismatch` when it differs, `empty` when not yet typed.
 */
export function passwordMatchStatuses(password: string, value: string): CharMatchStatus[] {
  return Array.from(password, (character, index) => {
    if (value[index] === undefined) return 'empty'
    return value[index] === character ? 'match' : 'mismatch'
  })
}

const cellVariants = tv({
  base: 'h-1.5 flex-1 rounded-full transition-colors duration-200',
  variants: {
    status: {
      empty: 'bg-foreground/15',
      match: 'bg-success',
      mismatch: 'bg-error',
    },
  },
  defaultVariants: { status: 'empty' },
})

type CellStatus = VariantProps<typeof cellVariants>['status']

export interface PasswordMatchStripProps {
  /** Target password the confirm value is compared against. */
  password: string
  /** Current confirm value. */
  value: string
  className?: string
}

/**
 * Segmented strip — one cell per character of the target password, coloured by
 * match status. Purely decorative (`aria-hidden`): validity is announced by the
 * form's error message, never by colour alone.
 */
export function PasswordMatchStrip({ password, value, className }: PasswordMatchStripProps) {
  const statuses = passwordMatchStatuses(password, value)

  return (
    <div className={cn('flex gap-1', className)} aria-hidden="true">
      {statuses.map((status, index) => (
        <div
          key={index}
          data-testid="apc-cell"
          data-status={status}
          className={cellVariants({ status: status as CellStatus })}
        />
      ))}
    </div>
  )
}
