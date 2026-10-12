import type { Meta, StoryObj } from '@storybook/react-vite'

import { PasswordInput } from './components/PasswordInput'

const meta = {
  title: 'Atoms/PasswordInput',
  component: PasswordInput,
  args: { placeholder: '••••••••', defaultValue: 'secret123' },
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Error: Story = { args: { state: 'error' } }
