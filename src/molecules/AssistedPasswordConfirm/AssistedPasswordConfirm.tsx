'use client'

import { motion } from 'framer-motion'
import { type ChangeEvent, forwardRef, useEffect, useState } from 'react'

import { PasswordInput, type PasswordInputProps } from '@/atoms/PasswordInput'
import { cn } from '@/lib/cn'

import { PasswordMatchStrip } from './components/PasswordMatchStrip'

const SHAKE_DURATION_MS = 500

export interface AssistedPasswordConfirmProps extends Omit<
  PasswordInputProps,
  'value' | 'onChange' | 'state'
> {
  /** The password to confirm against — drives the per-character match strip live. */
  password: string
  /** Controlled confirm value. */
  value: string
  /** Next confirm value. Keystrokes past the target length are rejected (the field shakes). */
  onValueChange: (next: string) => void
}

/**
 * Confirm-password field with live, per-character match feedback: a coloured
 * strip above the input (green = match, red = mismatch), a shake when the user
 * types past the target length, and a green border once the two fully match.
 *
 * Presentational and copy-free — `password`/`value` are controlled by the caller
 * (the app wires it to the first password field). Animations use framer-motion.
 */
export const AssistedPasswordConfirm = forwardRef<HTMLInputElement, AssistedPasswordConfirmProps>(
  function AssistedPasswordConfirm(
    { password, value, onValueChange, className, ...inputProps },
    ref
  ) {
    const [shake, setShake] = useState(false)
    const isMatch = password.length > 0 && password === value

    useEffect(() => {
      if (!shake) return
      const timer = setTimeout(() => setShake(false), SHAKE_DURATION_MS)
      return () => clearTimeout(timer)
    }, [shake])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value
      const isOverflow = value.length >= password.length && next.length > value.length
      if (isOverflow) {
        setShake(true)
        return
      }
      onValueChange(next)
    }

    return (
      <motion.div
        className="flex flex-col gap-2"
        animate={{
          x: shake ? [-8, 8, -8, 8, 0] : 0,
          scale: isMatch ? [1, 1.02, 1] : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        {password.length > 0 && <PasswordMatchStrip password={password} value={value} />}
        <PasswordInput
          ref={ref}
          value={value}
          onChange={handleChange}
          data-match={isMatch ? 'true' : 'false'}
          className={cn(
            isMatch && 'border-success focus:border-success focus:ring-success/25',
            className
          )}
          {...inputProps}
        />
      </motion.div>
    )
  }
)
