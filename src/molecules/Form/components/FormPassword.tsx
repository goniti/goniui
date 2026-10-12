'use client'

import { Lock } from 'lucide-react'
import { forwardRef } from 'react'

import { PasswordInput, type PasswordInputProps } from '@/atoms/PasswordInput'

import { useFormField } from '../hooks/useFormField'
import { FormError } from './FormError'
import { FormField } from './FormField'

export interface FormPasswordProps extends Omit<PasswordInputProps, 'startIcon'> {
  name: string
  /** Override the visible label; defaults to `'Password'`. Useful for confirm-password fields. */
  label?: string
}

/** Password preset — SSOT, keeps the eye-toggle; full shadcn-style a11y wiring. */
export const FormPassword = forwardRef<HTMLInputElement, FormPasswordProps>(function FormPassword(
  { name, id, label = 'Password', ...passwordAttrs },
  ref
) {
  const { invalid, formItemId, formMessageId } = useFormField(name)
  const fieldId = id ?? formItemId

  return (
    <FormField label={label} htmlFor={fieldId}>
      <PasswordInput
        ref={ref}
        id={fieldId}
        name={name}
        autoComplete="current-password"
        placeholder="••••••••"
        startIcon={<Lock size={18} />}
        showLabel="Show password"
        hideLabel="Hide password"
        state={invalid ? 'error' : 'default'}
        aria-invalid={invalid}
        aria-describedby={invalid ? formMessageId : undefined}
        {...passwordAttrs}
      />
      <FormError name={name} id={formMessageId} />
    </FormField>
  )
})
FormPassword.displayName = 'Form.Password'
