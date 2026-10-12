import type { Meta, StoryObj } from '@storybook/react-vite'
import { BarChart3, Blocks, CreditCard, Folder, Settings, Users } from 'lucide-react'
import type { ComponentProps } from 'react'
import { expect, waitFor, within } from 'storybook/test'

import { Icon } from '@/atoms/Icon'
import { Flex } from '@/atoms/layout/Flex'
import { Text } from '@/atoms/Text'
import * as DropdownMenu from '@/molecules/DropdownMenu'

import * as Sidebar from './index'

/** Stand-in for a router `Link`/`NavLink` injected via `asChild`. */
function RouterLink(props: ComponentProps<'a'>) {
  return <a data-router {...props} />
}

/** The product wordmark shown in the sidebar header (truncates as the rail narrows). */
function Wordmark() {
  return (
    <Text variant="h3" as="span" tone="primary" className="truncate">
      Brand
    </Text>
  )
}

const meta = {
  title: 'Molecules/Sidebar',
  component: Sidebar.Root,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="h-[560px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Sidebar.Root aria-label="Main navigation">
      <Sidebar.Header>
        <Wordmark />
      </Sidebar.Header>
      <Sidebar.GroupLabel>Organization</Sidebar.GroupLabel>
      <Sidebar.Group>
        <Sidebar.Item href="#" active icon={<Icon icon={Folder} size="sm" />} label="Projects" />
        <Sidebar.Item href="#" icon={<Icon icon={Users} size="sm" />} label="Team" />
        <Sidebar.Item href="#" icon={<Icon icon={Blocks} size="sm" />} label="Integrations" />
        <Sidebar.Item href="#" icon={<Icon icon={BarChart3} size="sm" />} label="Usage" />
        <Sidebar.Item href="#" icon={<Icon icon={CreditCard} size="sm" />} label="Billing" />
        <Sidebar.Item href="#" icon={<Icon icon={Settings} size="sm" />} label="Settings" />
      </Sidebar.Group>
      <Sidebar.Footer>
        <Text variant="caption">goniti's Org</Text>
      </Sidebar.Footer>
    </Sidebar.Root>
  ),
}

/**
 * Router-aware: `asChild` injects the app's router link (SPA nav, no reload).
 * `icon`/`label` stay on `Sidebar.Item` — the child only provides navigation.
 */
export const RouterLinks: Story = {
  render: () => (
    <Sidebar.Root aria-label="Main navigation">
      <Sidebar.Header>
        <Wordmark />
      </Sidebar.Header>
      <Sidebar.Group>
        <Sidebar.Item asChild active icon={<Icon icon={Folder} size="sm" />} label="Projects">
          <RouterLink href="/projects" />
        </Sidebar.Item>
        <Sidebar.Item asChild icon={<Icon icon={Users} size="sm" />} label="Team">
          <RouterLink href="/team" />
        </Sidebar.Item>
      </Sidebar.Group>
    </Sidebar.Root>
  ),
}

/** Shared item list for the display-mode demos. Each item advertises a shortcut. */
function DemoGroup() {
  return (
    <Sidebar.Group>
      <Sidebar.Item
        href="#"
        active
        icon={<Icon icon={Folder} size="sm" />}
        label="Projects"
        shortcut={['g', 'p']}
      />
      <Sidebar.Item
        href="#"
        icon={<Icon icon={Users} size="sm" />}
        label="Team"
        shortcut={['g', 't']}
      />
      <Sidebar.Item
        href="#"
        icon={<Icon icon={Blocks} size="sm" />}
        label="Integrations"
        shortcut={['g', 'i']}
      />
      <Sidebar.Item
        href="#"
        icon={<Icon icon={CreditCard} size="sm" />}
        label="Billing"
        shortcut={['g', 'b']}
      />
    </Sidebar.Group>
  )
}

/**
 * Collapsed — icons only; the labels remain as accessible names. The group
 * heading swaps to a thin separator (same height as expanded) instead of
 * disappearing, so items never shift position (regression #1150).
 */
export const Collapsed: Story = {
  render: () => (
    <Sidebar.Root aria-label="Main navigation" defaultMode="collapsed" shortcutSeparator="then">
      <Sidebar.Header>
        <Icon icon={Folder} size="sm" />
      </Sidebar.Header>
      <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
      <DemoGroup />
    </Sidebar.Root>
  ),
}

/** Expand-on-hover — collapsed until the pointer or keyboard focus enters the rail. */
export const Hover: Story = {
  render: () => (
    <Sidebar.Root aria-label="Main navigation" defaultMode="hover" shortcutSeparator="then">
      <Sidebar.Header>
        <Wordmark />
      </Sidebar.Header>
      <DemoGroup />
    </Sidebar.Root>
  ),
}

/**
 * Keyboard shortcuts + hints: each item advertises its sequence (chip on
 * hover/focus) and is activated by typing it (e.g. `G` then `B` → Billing).
 */
export const WithShortcuts: Story = {
  render: () => (
    <Sidebar.Root aria-label="Main navigation" shortcutSeparator="then">
      <Sidebar.Header>
        <Wordmark />
      </Sidebar.Header>
      <Sidebar.Group>
        <Sidebar.Item
          href="#projects"
          active
          icon={<Icon icon={Folder} size="sm" />}
          label="Projects"
          shortcut={['g', 'p']}
        />
        <Sidebar.Item
          href="#billing"
          icon={<Icon icon={CreditCard} size="sm" />}
          label="Billing"
          shortcut={['g', 'b']}
        />
        <Sidebar.Item
          href="#settings"
          icon={<Icon icon={Settings} size="sm" />}
          label="Settings"
          shortcut={['g', 's']}
        />
      </Sidebar.Group>
    </Sidebar.Root>
  ),
  // Hovering an item reveals its shortcut hint (label + key chips) in a tooltip.
  // (Sequence-activates-the-item is covered by the unit test — navigating here
  // would tear down the Storybook iframe connection.)
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(canvas.getByRole('link', { name: 'Billing' }))
    const body = within(canvasElement.ownerDocument.body)
    await waitFor(() => expect(body.getByRole('tooltip')).toBeTruthy())
  },
}

/** With the bottom mode control (popover) to switch Expanded / Collapsed / Expand-on-hover. */
export const WithModeControl: Story = {
  render: () => (
    <Sidebar.Root aria-label="Main navigation" shortcutSeparator="then">
      <Sidebar.Header>
        <Wordmark />
      </Sidebar.Header>
      <DemoGroup />
      <Sidebar.Footer>
        <Sidebar.ModeControl
          label="Sidebar control"
          expandedLabel="Expanded"
          collapsedLabel="Collapsed"
          hoverLabel="Expand on hover"
        />
      </Sidebar.Footer>
    </Sidebar.Root>
  ),
  // Open the popover and pick "Collapsed" → the rail collapses to the icon width.
  play: async ({ canvas, canvasElement, userEvent }) => {
    expect(canvasElement.querySelector('nav')?.className).toContain('w-60')
    await userEvent.click(canvas.getByRole('button', { name: 'Sidebar control' }))
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(await body.findByRole('menuitemradio', { name: 'Collapsed' }))
    await waitFor(() => expect(canvasElement.querySelector('nav')?.className).toContain('w-16'))
  },
}

/**
 * The mode control's optional "keyboard shortcuts" checkbox (WCAG 2.1.4): turning
 * it off drops both the `keydown` listener and the hint chip for every item.
 */
export const WithShortcutsToggle: Story = {
  render: () => (
    <Sidebar.Root aria-label="Main navigation" shortcutSeparator="then">
      <Sidebar.Header>
        <Wordmark />
      </Sidebar.Header>
      <DemoGroup />
      <Sidebar.Footer>
        <Sidebar.ModeControl
          label="Sidebar control"
          expandedLabel="Expanded"
          collapsedLabel="Collapsed"
          hoverLabel="Expand on hover"
          shortcutsLabel="Keyboard shortcuts"
        />
      </Sidebar.Footer>
    </Sidebar.Root>
  ),
  // Open the popover, uncheck "Keyboard shortcuts" — the hint chip disappears on hover.
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Sidebar control' }))
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(await body.findByRole('menuitemcheckbox', { name: 'Keyboard shortcuts' }))
    await userEvent.hover(canvas.getByRole('link', { name: 'Billing' }))
    await waitFor(() => expect(body.queryByRole('tooltip')).toBeNull())
  },
}

/**
 * The mode control's `children` slot: an app can append any `DropdownMenu`
 * content (here, a theme switcher) after the modes/shortcuts — ui-react stays
 * unaware of "theme", it only provides the generic extension point.
 */
export const WithExtraMenuContent: Story = {
  render: () => (
    <Sidebar.Root aria-label="Main navigation" shortcutSeparator="then">
      <Sidebar.Header>
        <Wordmark />
      </Sidebar.Header>
      <DemoGroup />
      <Sidebar.Footer>
        <Sidebar.ModeControl
          label="Sidebar control"
          expandedLabel="Expanded"
          collapsedLabel="Collapsed"
          hoverLabel="Expand on hover"
        >
          <DropdownMenu.Label>Theme</DropdownMenu.Label>
          <DropdownMenu.RadioGroup value="light">
            <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </Sidebar.ModeControl>
      </Sidebar.Footer>
    </Sidebar.Root>
  ),
  // Select the injected "Dark" radio item — closes the menu, leaving a clean DOM.
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Sidebar control' }))
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(await body.findByRole('menuitemradio', { name: 'Dark' }))
    await waitFor(() => expect(body.queryByRole('menuitemradio', { name: 'Dark' })).toBeNull())
  },
}

/** Shared item list for the badge demos: 0 (no badge), 1, and above the "9+" threshold. */
function BadgeDemoGroup() {
  return (
    <Sidebar.Group>
      <Sidebar.Item
        href="#"
        active
        icon={<Icon icon={Folder} size="sm" />}
        label="Projects"
        badge={0}
        badgeLabel="0 items"
      />
      <Sidebar.Item
        href="#"
        icon={<Icon icon={Users} size="sm" />}
        label="Team"
        badge={1}
        badgeLabel="1 invite"
      />
      <Sidebar.Item
        href="#"
        icon={<Icon icon={Blocks} size="sm" />}
        label="Integrations"
        badge={12}
        badgeLabel="12 pending"
      />
    </Sidebar.Group>
  )
}

/**
 * `badge` renders inline at the end of the row when expanded, and as a pastille
 * on the icon's corner when collapsed — `0` renders nothing, and values above 9
 * show as "9+". `badgeLabel` (translated by the app) is announced as part of the
 * accessible name in both modes.
 */
export const WithBadges: Story = {
  render: () => (
    <Flex gap="2xl">
      <Sidebar.Root aria-label="Expanded navigation">
        <Sidebar.Header>
          <Wordmark />
        </Sidebar.Header>
        <BadgeDemoGroup />
      </Sidebar.Root>
      <Sidebar.Root aria-label="Collapsed navigation" defaultMode="collapsed">
        <Sidebar.Header>
          <Icon icon={Folder} size="sm" />
        </Sidebar.Header>
        <BadgeDemoGroup />
      </Sidebar.Root>
    </Flex>
  ),
}

/** Mobile: a burger opens the same items in a bottom-sheet drawer (slides up, blur backdrop). */
export const MobileMenu: Story = {
  render: () => (
    <Sidebar.Mobile triggerLabel="Open menu" label="Main navigation">
      <Sidebar.Group>
        <Sidebar.Item href="#" active icon={<Icon icon={Folder} size="sm" />} label="Projects" />
        <Sidebar.Item href="#" icon={<Icon icon={Users} size="sm" />} label="Team" />
        <Sidebar.Item href="#" icon={<Icon icon={CreditCard} size="sm" />} label="Billing" />
      </Sidebar.Group>
    </Sidebar.Mobile>
  ),
  // Tapping the burger opens the bottom-sheet with the items.
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open menu' }))
    const body = within(canvasElement.ownerDocument.body)
    await waitFor(() => expect(body.getByRole('link', { name: 'Projects' })).toBeTruthy())
  },
}

/**
 * Responsive switch (CSS): the desktop rail is hidden below `md`, where the burger
 * shows instead — the same `DemoGroup` items drive both. Resize the preview to see it.
 */
export const Responsive: Story = {
  render: () => (
    <>
      <Sidebar.Root
        aria-label="Main navigation"
        className="hidden md:flex"
        shortcutSeparator="then"
      >
        <Sidebar.Header>
          <Wordmark />
        </Sidebar.Header>
        <DemoGroup />
      </Sidebar.Root>
      <Sidebar.Mobile triggerLabel="Open menu" label="Main navigation" className="md:hidden">
        <DemoGroup />
      </Sidebar.Mobile>
    </>
  ),
}
