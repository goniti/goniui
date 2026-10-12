import type { Meta, StoryObj } from '@storybook/react-vite'
import { Lock } from 'lucide-react'
import { type ComponentProps, useState } from 'react'

import { AssistedPasswordConfirm } from './AssistedPasswordConfirm'

const TARGET = 'StrongPass1!'

function InteractiveConfirm(args: ComponentProps<typeof AssistedPasswordConfirm>) {
  const [value, setValue] = useState('')
  return <AssistedPasswordConfirm {...args} value={value} onValueChange={setValue} />
}

const meta = {
  title: 'Molecules/AssistedPasswordConfirm',
  component: AssistedPasswordConfirm,
  args: {
    password: TARGET,
    startIcon: <Lock size={18} />,
    placeholder: '••••••••',
    showLabel: 'Show password',
    hideLabel: 'Hide password',
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AssistedPasswordConfirm>

export default meta
type Story = StoryObj<typeof meta>

/** Interactive — type the target `StrongPass1!` to watch the strip turn green. */
export const Interactive: Story = {
  args: { value: '', onValueChange: () => {} },
  render: (args) => <InteractiveConfirm {...args} />,
}

/** Nothing typed yet — every cell neutral. */
export const Empty: Story = {
  args: { value: '', onValueChange: () => {} },
}

/** Prefix matches so far — leading cells green, the rest neutral. */
export const PartialMatch: Story = {
  args: { value: 'Strong', onValueChange: () => {} },
}

/** Diverges midway — matching cells green, the wrong one red. */
export const Mismatch: Story = {
  args: { value: 'StrongXass', onValueChange: () => {} },
}

/** Full match — all cells green and the input shows the success border. */
export const Match: Story = {
  args: { value: TARGET, onValueChange: () => {} },
}
