import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  BookOpen,
  Boxes,
  type LucideIcon,
  Palette,
  Puzzle,
  Rocket,
  Sparkles,
  Wrench,
} from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import { Box } from '@/atoms/layout/Box'
import { Flex } from '@/atoms/layout/Flex'
import { Grid } from '@/atoms/layout/Grid'
import { Text } from '@/atoms/Text'
import { cn } from '@/lib/cn'
import * as Navbar from '@/molecules/Navbar'

import * as NavigationMenu from './index'

/** Stand-in for react-router's `NavLink` injected via `asChild` (SPA nav, no reload). */
function RouterLink(props: ComponentProps<'a'>) {
  return <a data-router {...props} />
}

/** A modern panel row: a leading icon chip, a title, and a muted one-line description. */
function FeatureLink({
  href,
  icon,
  title,
  children,
}: {
  href: string
  icon: LucideIcon
  title: string
  children: ReactNode
}) {
  return (
    <NavigationMenu.Link
      href={href}
      className={cn(NavigationMenu.navigationMenuLinkVariants(), 'flex items-start gap-3')}
    >
      <Box className="shrink-0 rounded-md bg-neutral-100 p-2 text-neutral-700">
        <Icon icon={icon} size="sm" />
      </Box>
      <Box>
        <Text as="span" variant="label" className="block leading-none">
          {title}
        </Text>
        <Text as="span" variant="bodySm" tone="muted" className="mt-1 block leading-snug">
          {children}
        </Text>
      </Box>
    </NavigationMenu.Link>
  )
}

/** A "What's New" card: a thumbnail, a date, and a caption. */
function NewsCard({ href, date, children }: { href: string; date: string; children: ReactNode }) {
  return (
    <NavigationMenu.Link
      href={href}
      className={cn(NavigationMenu.navigationMenuLinkVariants(), 'space-y-2 p-2')}
    >
      <Box className="h-20 w-full rounded-md bg-gradient-to-br from-primary-400 to-primary-700" />
      <Text as="span" variant="caption" tone="muted" className="block">
        {date}
      </Text>
      <Text as="span" variant="bodySm" className="block leading-snug">
        {children}
      </Text>
    </NavigationMenu.Link>
  )
}

/** The shared menu: a Relume-style mega-menu, a Radix-style feature grid, and a plain link. */
function Menu() {
  return (
    <NavigationMenu.Root aria-label="Primary">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Produits</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <Flex className="w-[680px] gap-4">
              <Grid className="flex-1 grid-cols-1 gap-1">
                <FeatureLink href="#" icon={Sparkles} title="AI Site Builder">
                  Generate sitemaps and wireframes in minutes.
                </FeatureLink>
                <FeatureLink href="#" icon={Boxes} title="React Library">
                  1k+ ready-to-use components.
                </FeatureLink>
                <FeatureLink href="#" icon={Palette} title="Style Guide Builder">
                  Consistent brand concepts.
                </FeatureLink>
                <FeatureLink href="#" icon={Puzzle} title="Chrome Extension">
                  Boost your productivity in the browser.
                </FeatureLink>
              </Grid>
              <Box className="w-60 rounded-lg bg-neutral-50 p-3">
                <Flex justify="between" align="center" className="mb-2 px-1">
                  <Text variant="caption" tone="muted">
                    What's new
                  </Text>
                  <NavigationMenu.Link
                    href="#"
                    className="text-xs font-medium text-primary-600 hover:underline"
                  >
                    Tout voir
                  </NavigationMenu.Link>
                </Flex>
                <Flex direction="col" gap="xs">
                  <NewsCard href="#" date="6 novembre 2025">
                    Image editing, component shuffling & more.
                  </NewsCard>
                  <NewsCard href="#" date="8 octobre 2025">
                    Advanced search is coming to the Site Builder.
                  </NewsCard>
                </Flex>
              </Box>
            </Flex>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Ressources</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <Grid className="w-[520px] grid-cols-2 gap-1">
              <FeatureLink href="#" icon={BookOpen} title="Documentation">
                Guides and API reference.
              </FeatureLink>
              <FeatureLink href="#" icon={Rocket} title="Getting started">
                Installez et structurez votre app.
              </FeatureLink>
              <FeatureLink href="#" icon={Boxes} title="Storybook">
                Every component state, for real.
              </FeatureLink>
              <FeatureLink href="#" icon={Wrench} title="Support">
                Ask the team your questions.
              </FeatureLink>
            </Grid>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#pricing"
            className={NavigationMenu.navigationMenuTriggerStyle()}
          >
            Tarifs
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator />
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

const meta = {
  title: 'Molecules/NavigationMenu',
  component: NavigationMenu.Root,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <Flex justify="center" align="start" className="h-[520px] pt-6">
        <Story />
      </Flex>
    ),
  ],
} satisfies Meta<typeof NavigationMenu.Root>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Hover (or focus) a trigger: its rich panel rises up from the bottom into the
 * shared viewport. (No auto-open `play`: while open, Radix mounts an internal
 * focus-proxy that the a11y check flags — an upstream element we don't own — so
 * the automated check runs on the closed state; open it by hand here to see it.)
 */
export const Default: Story = {
  render: () => <Menu />,
}

/** Composed inside the Navbar shell — the modern app bar: brand · mega-menu · actions. */
export const InNavbar: Story = {
  render: () => (
    <Navbar.Root bordered>
      <Navbar.Brand>
        <Text variant="h3" as="span" tone="primary">
          Brand
        </Text>
      </Navbar.Brand>
      <Menu />
      <Navbar.Actions>
        <Button variant="ghost" size="sm">
          Sign in
        </Button>
        <Button size="sm">Get started</Button>
      </Navbar.Actions>
    </Navbar.Root>
  ),
}

/**
 * Router-aware: `asChild` merges the link (active state, keyboard) onto your
 * router's `<NavLink>` — SPA navigation, no full reload. Works on both top-level
 * links and links inside a panel.
 */
export const RouterAware: Story = {
  render: () => (
    <NavigationMenu.Root aria-label="Primary">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            asChild
            active
            className={NavigationMenu.navigationMenuTriggerStyle()}
          >
            <RouterLink href="/dashboard">Dashboard</RouterLink>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild className={NavigationMenu.navigationMenuTriggerStyle()}>
            <RouterLink href="/settings">Settings</RouterLink>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  ),
}
