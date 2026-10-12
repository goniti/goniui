import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './Input'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  args: { placeholder: 'you@example.com' },
  argTypes: { state: { control: 'inline-radio', options: ['default', 'error'] } },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Error: Story = { args: { state: 'error', defaultValue: 'invalide' } }
export const WithStartIcon: Story = { args: { startIcon: <span>@</span> } }
