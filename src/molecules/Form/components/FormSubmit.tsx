'use client'

import type { ReactNode } from 'react'

import { Button, type ButtonProps } from '@/atoms/Button'
import { cn } from '@/lib/cn'

export interface FormSubmitProps {
  children: ReactNode
  name?: string
  disabled?: boolean
  className?: string
  /** Button variant — e.g. `destructive` for a delete submit. Defaults to primary. */
  variant?: ButtonProps['variant']
}

export function FormSubmit({ children, name, disabled, className, variant }: FormSubmitProps) {
  return (
    <Button
      type="submit"
      name={name}
      variant={variant}
      disabled={disabled}
      className={cn('w-full py-2.5', className)}
    >
      {children}
    </Button>
  )
}
