'use client'

import { useFormContext } from 'react-hook-form'

import { Text } from '@/atoms/Text'

import { getFieldError } from '../lib/getFieldError'

export interface FormErrorProps {
  name: string
  /** id referenced by the control's `aria-describedby` (shadcn-style wiring). */
  id?: string
}

/** Autonomous error: reads its own message from form context by `name`. */
export function FormError({ name, id }: FormErrorProps) {
  const {
    formState: { errors },
  } = useFormContext()
  const message = getFieldError(errors, name)?.message
  if (typeof message !== 'string') return null
  return (
    <Text as="p" variant="caption" tone="error" id={id} aria-live="polite" className="mt-1.5">
      {message}
    </Text>
  )
}
FormError.displayName = 'Form.Error'
