'use client'

import { Lock } from 'lucide-react'
import { useController, useWatch } from 'react-hook-form'

import { AssistedPasswordConfirm } from '@/molecules/AssistedPasswordConfirm'

import { useFormField } from '../hooks/useFormField'
import { FormError } from './FormError'
import { FormField } from './FormField'

export interface FormAssistedPasswordConfirmProps {
  name: string
  /** Name of the password field this confirm is matched against. */
  passwordFieldName: string
  /** Override the visible label; defaults to `'Confirm password'`. */
  label?: string
}

/**
 * Confirm-password preset with live per-character match feedback. Controlled via
 * `useController` (the native form still POSTs its DOM value), and reads the
 * target password from form context with `useWatch`.
 */
export function FormAssistedPasswordConfirm({
  name,
  passwordFieldName,
  label = 'Confirm password',
}: FormAssistedPasswordConfirmProps) {
  const { invalid, formItemId, formMessageId } = useFormField(name)
  const { field } = useController({ name })
  const password = useWatch({ name: passwordFieldName }) ?? ''

  return (
    <FormField label={label} htmlFor={formItemId}>
      <AssistedPasswordConfirm
        ref={field.ref}
        id={formItemId}
        name={name}
        password={password}
        value={field.value ?? ''}
        onValueChange={field.onChange}
        onBlur={field.onBlur}
        autoComplete="new-password"
        placeholder="••••••••"
        startIcon={<Lock size={18} />}
        showLabel="Show password"
        hideLabel="Hide password"
        aria-invalid={invalid}
        aria-describedby={invalid ? formMessageId : undefined}
      />
      <FormError name={name} id={formMessageId} />
    </FormField>
  )
}
FormAssistedPasswordConfirm.displayName = 'Form.AssistedPasswordConfirm'
