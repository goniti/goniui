import type { Meta, StoryObj } from '@storybook/react-vite'

import { Textarea } from './Textarea'

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  args: { placeholder: 'Write something…', rows: 3 },
  argTypes: { state: { control: 'inline-radio', options: ['default', 'error'] } },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Error: Story = { args: { state: 'error', defaultValue: 'Texte invalide' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Read only' } }
