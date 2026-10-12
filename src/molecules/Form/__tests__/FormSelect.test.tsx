import { render, screen } from '@testing-library/react'
import { type ReactNode, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { describe, expect, it } from 'vitest'

import { SelectOption } from '@/atoms/Select'

import { FormSelect } from '../components/FormSelect'

interface FormWrapperProps {
  children: ReactNode
  errorMessage?: string
}

function FormWrapper({ children, errorMessage }: FormWrapperProps) {
  const methods = useForm({ defaultValues: { category: 'drink' } })

  useEffect(() => {
    if (errorMessage) methods.setError('category', { type: 'manual', message: errorMessage })
  }, [errorMessage, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('FormSelect', () => {
  it('renders its label, linked to the select, and its options', () => {
    render(
      <FormWrapper>
        <FormSelect label="Category" name="category">
          <SelectOption value="drink">Boisson</SelectOption>
          <SelectOption value="snack">Snack</SelectOption>
        </FormSelect>
      </FormWrapper>
    )

    const select = screen.getByLabelText('Category')
    expect(select.tagName).toBe('SELECT')
    expect(screen.getByRole('option', { name: 'Boisson' })).not.toBeNull()
  })

  it('gives each select its own id, so two on a page do not collide', () => {
    render(
      <FormWrapper>
        <FormSelect label="Category" name="category">
          <SelectOption value="drink">Boisson</SelectOption>
        </FormSelect>
        <FormSelect label="Autre" name="other">
          <SelectOption value="a">A</SelectOption>
        </FormSelect>
      </FormWrapper>
    )

    const [first, second] = screen.getAllByRole('combobox')
    expect(first.id).not.toBe('')
    expect(first.id).not.toBe(second.id)
  })

  it('marks the field invalid and describes it by the error message when form context has one', () => {
    render(
      <FormWrapper errorMessage="Invalid category">
        <FormSelect label="Category" name="category">
          <SelectOption value="drink">Boisson</SelectOption>
        </FormSelect>
      </FormWrapper>
    )

    const select = screen.getByRole('combobox', { name: 'Category' })
    const message = screen.getByText('Invalid category')

    expect(select.getAttribute('aria-invalid')).toBe('true')
    expect(select.getAttribute('aria-describedby')).toBe(message.id)
  })

  it('has no error message when the field is valid', () => {
    render(
      <FormWrapper>
        <FormSelect label="Category" name="category">
          <SelectOption value="drink">Boisson</SelectOption>
        </FormSelect>
      </FormWrapper>
    )

    expect(screen.getByRole('combobox', { name: 'Category' }).getAttribute('aria-invalid')).toBe(
      'false'
    )
  })
})
