// Independent named exports (Radix / shadcn pattern) — no Object.assign, so a
// bundler can tree-shake any subcomponent the app never uses.
// Consume as a namespace: `import * as Form from 'goniui/form'`
// then `<Form.Root>`, `<Form.Email>`… — or import a single piece directly.
export { FormActions as Actions, type FormActionsProps } from './components/FormActions'
export {
  FormAssistedPasswordConfirm as AssistedPasswordConfirm,
  type FormAssistedPasswordConfirmProps,
} from './components/FormAssistedPasswordConfirm'
export { FormCheckbox as Checkbox, type FormCheckboxProps } from './components/FormCheckbox'
export { FormEmail as Email, type FormEmailProps } from './components/FormEmail'
export { FormError as Error, type FormErrorProps } from './components/FormError'
export { type FormInputProps, FormInput as Input } from './components/FormInput'
export { type FormLinkProps, FormLink as Link } from './components/FormLink'
export { type FormPasswordProps, FormPassword as Password } from './components/FormPassword'
export { type FormProps, FormRoot as Root } from './components/FormRoot'
export { type FormSelectProps, FormSelect as Select } from './components/FormSelect'
export { type FormSubmitProps, FormSubmit as Submit } from './components/FormSubmit'
export { type FormTextareaProps, FormTextarea as Textarea } from './components/FormTextarea'
