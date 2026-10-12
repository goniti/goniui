import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '@/atoms/Input'

import { FormField } from './components/FormField'

const meta = {
  title: 'Molecules/Form/FormField',
  component: FormField,
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    htmlFor: 'email',
    children: <Input id="email" placeholder="you@example.com" />,
  },
}
