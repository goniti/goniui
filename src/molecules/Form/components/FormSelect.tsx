'use client'

import { forwardRef } from 'react'

import { Select, type SelectProps } from '@/atoms/Select'

import { useFormField } from '../hooks/useFormField'
import { FormError } from './FormError'
import { FormField } from './FormField'

export interface FormSelectProps extends SelectProps {
  label: string
  name: string
}

/**
 * Context-aware select. a11y (shadcn-style): unique id, `aria-invalid` and
 * `aria-describedby` link the control to its error message; the visual error
 * state and the message itself come from form context. Children are
 * `SelectOption`s, supplied by the caller.
 */
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(function FormSelect(
  { label, name, id, ...selectAttrs },
  ref
) {
  const { invalid, formItemId, formMessageId } = useFormField(name)
  const fieldId = id ?? formItemId

  return (
    <FormField label={label} htmlFor={fieldId}>
      <Select
        ref={ref}
        id={fieldId}
        name={name}
        state={invalid ? 'error' : 'default'}
        aria-invalid={invalid}
        aria-describedby={invalid ? formMessageId : undefined}
        {...selectAttrs}
      />
      <FormError name={name} id={formMessageId} />
    </FormField>
  )
})
FormSelect.displayName = 'Form.Select'
