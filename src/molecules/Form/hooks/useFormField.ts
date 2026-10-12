'use client'

import { useId } from 'react'
import { useFormContext } from 'react-hook-form'

import { getFieldError } from '../lib/getFieldError'

/**
 * shadcn's accessibility wiring, adapted to uncontrolled `register` fields
 * (no Controller — so the native form can POST to Keycloak). Derives stable
 * unique ids and reads the field error from form context.
 */
export function useFormField(name: string) {
  const id = useId()
  const {
    formState: { errors },
  } = useFormContext()
  const invalid = !!getFieldError(errors, name)
  return {
    name,
    invalid,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  }
}
