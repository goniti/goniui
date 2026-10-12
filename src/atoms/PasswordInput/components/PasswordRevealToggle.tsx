'use client'

import { Eye, EyeOff } from 'lucide-react'

import { Button } from '@/atoms/Button'

export interface PasswordRevealToggleProps {
  revealed: boolean
  onToggle: () => void
  showLabel?: string
  hideLabel?: string
}

/**
 * @internal Sole integration point for the password reveal control.
 * Never duplicate this toggle outside `PasswordInput`.
 */
export function PasswordRevealToggle({
  revealed,
  onToggle,
  showLabel = 'Show password',
  hideLabel = 'Hide password',
}: PasswordRevealToggleProps) {
  return (
    <Button
      variant="unstyled"
      size="none"
      onClick={onToggle}
      aria-label={revealed ? hideLabel : showLabel}
      className="grid h-full w-full place-items-center text-foreground-muted hover:text-foreground"
    >
      {revealed ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
    </Button>
  )
}
