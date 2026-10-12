import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from './index'

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  args: { 'aria-label': 'Accept the terms' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = { args: { checked: false } }
export const Checked: Story = { args: { checked: true } }
export const Indeterminate: Story = { args: { checked: 'indeterminate' } }
export const Disabled: Story = { args: { checked: true, disabled: true } }

export const Sizes: Story = {
  args: { checked: true },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Checkbox {...args} size="sm" />
      <Checkbox {...args} size="md" />
      <Checkbox {...args} size="lg" />
    </div>
  ),
}
