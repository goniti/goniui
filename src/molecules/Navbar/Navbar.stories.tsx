import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/atoms/Button'
import { Box } from '@/atoms/layout/Box'
import { Text } from '@/atoms/Text'
import { cn } from '@/lib/cn'
import * as NavigationMenu from '@/molecules/NavigationMenu'

import * as Navbar from './index'

/** The product wordmark shown in the navbar brand slot. */
function Wordmark({ tone = 'primary' }: { tone?: 'primary' | 'inverse' }) {
  return (
    <Text variant="h3" as="span" tone={tone}>
      Brand
    </Text>
  )
}

/**
 * The nav links — a `NavigationMenu` of plain links (the single nav-links widget;
 * swap any item for a `Trigger` + `Content` to get a dropdown / mega-menu).
 */
function NavLinks({ dark = false }: { dark?: boolean }) {
  const linkClass = dark
    ? cn(
        NavigationMenu.navigationMenuTriggerStyle(),
        'bg-transparent text-primary-100 hover:text-white after:bg-white'
      )
    : NavigationMenu.navigationMenuTriggerStyle()
  return (
    <NavigationMenu.Root aria-label="Primary">
      <NavigationMenu.List>
        {['Home', 'Documentation', 'Pricing', 'About'].map((label) => (
          <NavigationMenu.Item key={label}>
            <NavigationMenu.Link href="#" className={linkClass}>
              {label}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

const meta = {
  title: 'Molecules/Navbar',
  component: Navbar.Root,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Navbar.Root>

export default meta
type Story = StoryObj<typeof meta>

/** The shell: a `<header>` banner holding the brand, the nav links, and actions. */
export const Default: Story = {
  render: () => (
    <Navbar.Root bordered>
      <Navbar.Brand>
        <Wordmark />
      </Navbar.Brand>
      <NavLinks />
      <Navbar.Actions>
        <Button variant="ghost" size="sm">
          Sign in
        </Button>
        <Button size="sm">Get started</Button>
      </Navbar.Actions>
    </Navbar.Root>
  ),
}

/** Sticky — the bar stays fixed at the top of the viewport on scroll. */
export const Sticky: Story = {
  render: () => (
    <Navbar.Root sticky bordered>
      <Navbar.Brand>
        <Wordmark />
      </Navbar.Brand>
      <NavLinks />
      <Navbar.Actions>
        <Button variant="secondary" size="sm">
          Log out
        </Button>
      </Navbar.Actions>
    </Navbar.Root>
  ),
}

/** Brand-only — a minimal bar with no links. */
export const BrandOnly: Story = {
  render: () => (
    <Navbar.Root bordered>
      <Navbar.Brand>
        <Wordmark />
      </Navbar.Brand>
    </Navbar.Root>
  ),
}

/** Custom background — `className` override on the shell + dark-styled links. */
export const CustomBackground: Story = {
  render: () => (
    <Box className="bg-primary-700">
      <Navbar.Root className="bg-primary-700">
        <Navbar.Brand>
          <Wordmark tone="inverse" />
        </Navbar.Brand>
        <NavLinks dark />
        <Navbar.Actions>
          <Button variant="ghost" size="sm" className="text-white hover:bg-primary-600">
            Log out
          </Button>
        </Navbar.Actions>
      </Navbar.Root>
    </Box>
  ),
}
