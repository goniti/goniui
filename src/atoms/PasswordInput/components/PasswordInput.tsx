'use client'

import { forwardRef, useState } from 'react'

import { Input, type InputProps } from '@/atoms/Input'

import { PasswordRevealToggle } from './PasswordRevealToggle'

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'endSlot'> {
  showLabel?: string
  hideLabel?: string
}

/** Password input with a built-in reveal toggle. */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ showLabel, hideLabel, ...props }, ref) {
    const [revealed, setRevealed] = useState(false)

    return (
      <Input
        ref={ref}
        type={revealed ? 'text' : 'password'}
        endSlot={
          <PasswordRevealToggle
            revealed={revealed}
            onToggle={() => setRevealed((previous) => !previous)}
            showLabel={showLabel}
            hideLabel={hideLabel}
          />
        }
        {...props}
      />
    )
  }
)
