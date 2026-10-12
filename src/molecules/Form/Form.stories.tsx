import type { Meta } from '@storybook/react-vite'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Box } from '@/atoms/layout/Box'
import { SelectOption } from '@/atoms/Select'

import * as Form from '.'

// Stories for Form use render-only (no args) because FormRoot requires a
// FormProvider context. Each story renders a self-contained wrapper component.
const meta: Meta = {
  title: 'Molecules/Form',
}

export default meta

// ── Helpers ───────────────────────────────────────────────────────────────────

function LoginFormWrapper() {
  const methods = useForm({ defaultValues: { username: '', password: '', rememberMe: false } })
  return (
    <Box className="w-80">
      <Form.Root methods={methods} onSubmit={() => {}}>
        <Form.Email name="username" />
        <Form.Password name="password" />
        <Form.Actions>
          <Form.Checkbox name="rememberMe" label="Se souvenir de moi" />
          <Form.Link href="#">Forgot password?</Form.Link>
        </Form.Actions>
        <Form.Submit>Sign in</Form.Submit>
      </Form.Root>
    </Box>
  )
}

function WithErrorsWrapper() {
  const methods = useForm({ defaultValues: { username: '', password: '', rememberMe: false } })

  // Seed validation errors for the "error state" story
  useEffect(() => {
    methods.setError('username', { type: 'manual', message: 'Adresse email invalide' })
    methods.setError('password', { type: 'manual', message: 'Password required' })
  }, [methods])

  return (
    <Box className="w-80">
      <Form.Root methods={methods} onSubmit={() => {}}>
        <Form.Email name="username" />
        <Form.Password name="password" />
        <Form.Actions>
          <Form.Checkbox name="rememberMe" label="Se souvenir de moi" />
          <Form.Link href="#">Forgot password?</Form.Link>
        </Form.Actions>
        <Form.Submit disabled>Sign in</Form.Submit>
      </Form.Root>
    </Box>
  )
}

function GenericInputWrapper() {
  const methods = useForm({ defaultValues: { email: '', field2: '' } })

  useEffect(() => {
    methods.setError('field2', { type: 'manual', message: 'Ce champ est requis' })
  }, [methods])

  return (
    <Box className="w-80">
      <Form.Root methods={methods} onSubmit={() => {}}>
        <Form.Input label="Username" name="email" icon="mail" />
        <Form.Input label="Avec erreur" name="field2" />
        <Form.Submit>Send</Form.Submit>
      </Form.Root>
    </Box>
  )
}

function SelectWrapper() {
  const methods = useForm({ defaultValues: { category: 'drink', field2: '' } })

  useEffect(() => {
    methods.setError('field2', { type: 'manual', message: 'Ce champ est requis' })
  }, [methods])

  return (
    <Box className="w-80">
      <Form.Root methods={methods} onSubmit={() => {}}>
        <Form.Select label="Category" name="category">
          <SelectOption value="drink">Boisson</SelectOption>
          <SelectOption value="snack">Snack</SelectOption>
          <SelectOption value="other">Autre</SelectOption>
        </Form.Select>
        <Form.Select label="Avec erreur" name="field2">
          <SelectOption value="">Choose an option…</SelectOption>
          <SelectOption value="a">Option A</SelectOption>
        </Form.Select>
        <Form.Submit>Send</Form.Submit>
      </Form.Root>
    </Box>
  )
}

function RegisterFormWrapper() {
  const methods = useForm({
    defaultValues: { email: '', password: '', 'password-confirm': '' },
  })
  return (
    <Box className="w-80">
      <Form.Root methods={methods} onSubmit={() => {}}>
        <Form.Email name="email" />
        <Form.Password name="password" autoComplete="new-password" />
        <Form.Password
          name="password-confirm"
          label="Confirm password"
          autoComplete="new-password"
        />
        <Form.Submit>Create my account</Form.Submit>
      </Form.Root>
    </Box>
  )
}

// ── Stories ───────────────────────────────────────────────────────────────────

export const LoginForm = {
  render: () => <LoginFormWrapper />,
}

export const WithErrors = {
  render: () => <WithErrorsWrapper />,
}

export const GenericInput = {
  render: () => <GenericInputWrapper />,
}

export const Select = {
  render: () => <SelectWrapper />,
}

export const RegisterForm = {
  render: () => <RegisterFormWrapper />,
}
