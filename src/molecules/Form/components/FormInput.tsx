'use client'

import { AtSign, Lock, type LucideIcon, Mail } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes } from 'react'

import { Input } from '@/atoms/Input'

import { useFormField } from '../hooks/useFormField'
import { FormError } from './FormError'
import { FormField } from './FormField'

const ICON_MAP: Record<string, LucideIcon> = { mail: Mail, lock: Lock, atSign: AtSign }

export interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  name: string
  icon?: string
}

/**
 * Context-aware text field. a11y (shadcn-style): unique id, `aria-invalid` and
 * `aria-describedby` link the control to its error message; the visual red
 * state and the message itself come from form context.
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  { label, name, icon, id, ...inputAttrs },
  ref
) {
  const { invalid, formItemId, formMessageId } = useFormField(name)
  const fieldId = id ?? formItemId
  const IconComponent = icon ? ICON_MAP[icon] : undefined

  return (
    <FormField label={label} htmlFor={fieldId}>
      <Input
        ref={ref}
        id={fieldId}
        name={name}
        state={invalid ? 'error' : 'default'}
        aria-invalid={invalid}
        aria-describedby={invalid ? formMessageId : undefined}
        startIcon={IconComponent ? <IconComponent size={18} /> : undefined}
        {...inputAttrs}
      />
      <FormError name={name} id={formMessageId} />
    </FormField>
  )
})
FormInput.displayName = 'Form.Input'
