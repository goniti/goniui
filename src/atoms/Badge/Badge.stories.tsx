import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Flex } from '@/atoms/layout/Flex'

import { Badge } from './components/Badge'

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    variant: { control: 'inline-radio', options: ['solid', 'outline'] },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Outline: Story = {
  args: { children: 'Editor', variant: 'outline' },
}

export const Solid: Story = {
  args: { children: 'Editor', variant: 'solid' },
}

export const Removable: Story = {
  args: { children: 'Editor', variant: 'solid', removeLabel: 'Retirer Editor' },
  render: (args) => <Badge {...args} onRemove={() => {}} />,
}

function SelectableListDemo() {
  const options = ['Admin', 'Editor', 'Viewer']
  const [selected, setSelected] = useState<string[]>(['Editor'])

  return (
    <Flex gap="xs" wrap="wrap">
      {options.map((option) => {
        const isSelected = selected.includes(option)
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isSelected}
            onClick={() =>
              setSelected((current) =>
                isSelected ? current.filter((value) => value !== option) : [...current, option]
              )
            }
          >
            <Badge variant={isSelected ? 'solid' : 'outline'}>{option}</Badge>
          </button>
        )
      })}
    </Flex>
  )
}

export const SelectableList: Story = {
  args: { children: 'Editor' },
  render: () => <SelectableListDemo />,
}
