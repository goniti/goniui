'use client'

import type { ComponentPropsWithoutRef } from 'react'
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form'

import { cn } from '@/lib/cn'

export interface FormProps<T extends FieldValues = FieldValues> extends Omit<
  ComponentPropsWithoutRef<'form'>,
  'onSubmit'
> {
  methods: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
}

/** Form root: FormProvider context + the native <form> (keeps action/method for native POST). */
export function FormRoot<T extends FieldValues>({
  methods,
  onSubmit,
  className,
  children,
  ...formAttrs
}: FormProps<T>) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className={cn('flex flex-col gap-4', className)}
        {...formAttrs}
      >
        {children}
      </form>
    </FormProvider>
  )
}
