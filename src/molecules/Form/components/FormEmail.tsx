'use client'

import { forwardRef, type InputHTMLAttributes } from 'react'

import { FormInput } from './FormInput'

export interface FormEmailProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  name: string
  /** Override the visible label; defaults to `'Email'`. */
  label?: string
  /** Override the placeholder; defaults to `'you@example.com'`. */
  placeholder?: string
}

/** Email preset — SSOT for type/icon/autoComplete/a11y wiring. Label and placeholder are overridable for i18n. */
export const FormEmail = forwardRef<HTMLInputElement, FormEmailProps>(function FormEmail(
  { name, label = 'Email', placeholder = 'you@example.com', ...inputAttrs },
  ref
) {
  return (
    <FormInput
      ref={ref}
      label={label}
      name={name}
      type="email"
      icon="atSign"
      autoComplete="email"
      placeholder={placeholder}
      {...inputAttrs}
    />
  )
})
FormEmail.displayName = 'Form.Email'
