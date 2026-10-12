import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heart, Star } from 'lucide-react'

import { brandIcons } from './components/brand-icons'
import { Icon } from './components/Icon'

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    intent: { control: 'inline-radio', options: ['current', 'primary', 'muted', 'danger'] },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

// A Lucide icon — same component as any custom icon.
export const Lucide: Story = {
  args: { icon: Heart, size: 'lg', intent: 'danger', 'aria-label': 'Like' },
}

// Any Lucide icon, tinted by `intent`.
export const Primary: Story = {
  args: { icon: Star, size: 'lg', intent: 'primary', 'aria-label': 'Favorite' },
}

export const Sizes: Story = {
  args: { icon: Heart },
  render: () => (
    <div className="flex items-end gap-4 text-primary-600">
      <Icon icon={Heart} size="sm" />
      <Icon icon={Heart} size="md" />
      <Icon icon={Heart} size="lg" />
      <Icon icon={Heart} size="xl" />
    </div>
  ),
}

// Brand/provider marks keep their fixed colours (Google 4-colour, Facebook blue);
// monochrome ones (Apple, X) take the surrounding text colour.
export const Brands: Story = {
  args: { icon: brandIcons.google },
  render: () => (
    <div className="flex items-center gap-4 text-neutral-700">
      <Icon icon={brandIcons.google} size="lg" aria-label="Google" />
      <Icon icon={brandIcons.apple} size="lg" aria-label="Apple" />
      <Icon icon={brandIcons.facebook} size="lg" aria-label="Facebook" />
      <Icon icon={brandIcons.github} size="lg" aria-label="GitHub" />
      <Icon icon={brandIcons.discord} size="lg" aria-label="Discord" />
      <Icon icon={brandIcons.microsoft} size="lg" aria-label="Microsoft" />
      <Icon icon={brandIcons.x} size="lg" aria-label="X" />
    </div>
  ),
}
