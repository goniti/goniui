import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '@/atoms/Text'

import { BackToTop } from './components/BackToTop'

const meta: Meta<typeof BackToTop> = {
  title: 'Molecules/BackToTop',
  component: BackToTop,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof BackToTop>

export const Default: Story = {
  args: { label: 'Back to top' },
  render: (args) => (
    <div className="flex min-h-[400dvh] flex-col gap-8 p-8">
      <Text variant="h2">Scroll down…</Text>
      <Text variant="body" tone="muted">
        The button appears after ~1.5 viewport-heights of scroll and smooth-scrolls back to the top
        (instant when prefers-reduced-motion).
      </Text>
      <BackToTop {...args} />
    </div>
  ),
}

export const LowerThreshold: Story = {
  args: { label: 'Back to top', thresholdViewports: 0.5 },
  render: (args) => (
    <div className="min-h-[300dvh] p-8">
      <Text variant="body">Appears after only half a viewport of scroll.</Text>
      <BackToTop {...args} />
    </div>
  ),
}
