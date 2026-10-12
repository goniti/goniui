import type { Meta, StoryObj } from '@storybook/react-vite'

import * as SegmentedControl from './index'

const meta = {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl.Root,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SegmentedControl.Root>

export default meta
type Story = StoryObj<typeof meta>

/** Navigation between two server pages: current = static label, other = link. */
export const AuthSwitch: Story = {
  render: () => (
    <div className="w-80">
      <SegmentedControl.Root aria-label="Authentication mode">
        <SegmentedControl.Item active asChild>
          <span aria-current="page">Sign in</span>
        </SegmentedControl.Item>
        <SegmentedControl.Item asChild>
          <a href="#register">Sign up</a>
        </SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
  ),
}

/** Client-side toggle: buttons with an `onClick` (default element). */
export const Buttons: Story = {
  render: () => (
    <div className="w-80">
      <SegmentedControl.Root aria-label="View">
        <SegmentedControl.Item active>Grille</SegmentedControl.Item>
        <SegmentedControl.Item>Liste</SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
  ),
}

/** Three segments share the row evenly. */
export const ThreeSegments: Story = {
  render: () => (
    <div className="w-96">
      <SegmentedControl.Root aria-label="Difficulty">
        <SegmentedControl.Item active>Beginner</SegmentedControl.Item>
        <SegmentedControl.Item>Intermediate</SegmentedControl.Item>
        <SegmentedControl.Item>Advanced</SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
  ),
}

/**
 * Regression (#1156): long labels must stay on one line, even when the
 * container shrinks to fit its content (`w-auto`) instead of spanning full width.
 */
export const LongLabels: Story = {
  render: () => (
    <div className="w-auto">
      <SegmentedControl.Root aria-label="Moderation status">
        <SegmentedControl.Item active>En attente · 1</SegmentedControl.Item>
        <SegmentedControl.Item>Approved · 0</SegmentedControl.Item>
        <SegmentedControl.Item>Rejected · 2</SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
  ),
}

/**
 * Regression (#1156): on a narrow viewport, the control scrolls horizontally
 * instead of wrapping or clipping the tab labels.
 */
export const LongLabelsNarrowContainer: Story = {
  render: () => (
    <div className="w-[280px]">
      <SegmentedControl.Root aria-label="Moderation status">
        <SegmentedControl.Item active>En attente · 1</SegmentedControl.Item>
        <SegmentedControl.Item>Approved · 0</SegmentedControl.Item>
        <SegmentedControl.Item>Rejected · 2</SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
  ),
}
