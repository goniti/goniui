'use client'

import { forwardRef } from 'react'

import { Textarea, type TextareaProps } from '@/atoms/Textarea'

import { useFormField } from '../hooks/useFormField'
import { FormError } from './FormError'
import { FormField } from './FormField'

export interface FormTextareaProps extends TextareaProps {
  label: string
  name: string
}

/**
 * Context-aware textarea. a11y (shadcn-style): unique id, `aria-invalid` and
 * `aria-describedby` link the control to its error message; the visual error
 * state and the message itself come from form context.
 */
export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  function FormTextarea({ label, name, id, ...textareaAttrs }, ref) {
    const { invalid, formItemId, formMessageId } = useFormField(name)
    const fieldId = id ?? formItemId

    return (
      <FormField label={label} htmlFor={fieldId}>
        <Textarea
          ref={ref}
          id={fieldId}
          name={name}
          state={invalid ? 'error' : 'default'}
          aria-invalid={invalid}
          aria-describedby={invalid ? formMessageId : undefined}
          {...textareaAttrs}
        />
        <FormError name={name} id={formMessageId} />
      </FormField>
    )
  }
)
FormTextarea.displayName = 'Form.Textarea'
