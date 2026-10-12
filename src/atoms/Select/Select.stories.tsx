import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select } from './Select'
import { SelectOption } from './SelectOption'

const meta = {
  title: 'Atoms/Select',
  component: Select,
  args: { 'aria-label': 'Category' },
  argTypes: { state: { control: 'inline-radio', options: ['default', 'error'] } },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="drink">Boisson</SelectOption>
      <SelectOption value="snack">Snack</SelectOption>
      <SelectOption value="other">Autre</SelectOption>
    </Select>
  ),
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Error: Story = { args: { state: 'error' } }
export const Disabled: Story = { args: { disabled: true } }
export const WithPlaceholder: Story = {
  args: { defaultValue: '' },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="" disabled>
        Choose a category…
      </SelectOption>
      <SelectOption value="drink">Boisson</SelectOption>
      <SelectOption value="snack">Snack</SelectOption>
    </Select>
  ),
}
