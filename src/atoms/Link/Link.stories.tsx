import type { Meta, StoryObj } from '@storybook/react-vite'

import { Link } from './Link'

const meta = {
  title: 'Atoms/Link',
  component: Link,
  args: { children: 'Learn more', href: 'https://example.com/docs' },
  argTypes: {
    kind: { control: 'inline-radio', options: ['internal', 'external'] },
    variant: {
      control: 'inline-radio',
      options: ['default', 'muted', 'underline', 'nav'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Internal: Story = {
  args: { kind: 'internal', href: '/docs', children: 'Documentation' },
}

export const External: Story = {
  args: {
    kind: 'external',
    href: 'https://example.com/docs',
    children: 'Open documentation',
  },
}

export const Muted: Story = { args: { variant: 'muted' } }
export const Underline: Story = { args: { variant: 'underline' } }
export const Nav: Story = { args: { variant: 'nav', kind: 'internal', href: '/dashboard' } }
export const Small: Story = { args: { size: 'sm' } }

export const AllVariants: Story = {
  args: { kind: 'internal', href: '#' },
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Link {...args} variant="default" />
      <Link {...args} variant="muted" />
      <Link {...args} variant="underline" />
      <Link {...args} variant="nav" />
    </div>
  ),
}
