import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { brandIcons } from '../Icon/components/brand-icons'
import { Icon } from '../Icon/components/Icon'
import { Link } from '../Link/Link'
import { Button } from './components/Button'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: { children: 'Add to board' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'destructive', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: 'primary' } }
export const Destructive: Story = { args: { variant: 'destructive' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Disabled: Story = { args: { disabled: true } }

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <Button {...args} variant="primary" />
      <Button {...args} variant="destructive" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="ghost" />
    </div>
  ),
}

// Social login buttons are NOT a separate component — they are the Button atom in
// composition: `asChild` renders the child <a>, `variant="secondary"` provides the
// outline chrome via tokens, `size="none"` + a square className make the icon button.
export const SocialIconLink: Story = {
  render: () => (
    <div className="flex gap-3">
      {['google', 'facebook'].map((alias) => (
        <Button
          key={alias}
          asChild
          variant="secondary"
          size="none"
          className="grid h-11 w-11 place-items-center"
        >
          <a href="#" aria-label={alias}>
            <Icon icon={brandIcons[alias]} aria-label={alias} />
          </a>
        </Button>
      ))}
    </div>
  ),
}

// Composing `Button asChild` with `Link` must give the Link the BUTTON's
// colour, never Link's own default brand colour, in every theme — the
// caller never has to reach for `variant="unstyled"` on the Link. ui-react's
// Storybook build drives `dark:` off `prefers-color-scheme` (no `.dark` class
// override wired here), so this checks the rendered class list rather than a
// computed colour; `Button.test.tsx` is the exhaustive, theme-agnostic proof
// across all four variants.
export const AsChildWithLink: Story = {
  args: { variant: 'primary' },
  render: (args) => (
    <Button {...args} asChild>
      <Link kind="internal" href="#">
        Add a game
      </Link>
    </Button>
  ),
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Add a game' })
    await expect(link.className).toContain('text-primary-foreground')
    await expect(link.className).not.toContain('text-primary-700')
    await expect(link.className).not.toContain('dark:text-primary-400')
  },
}

// Proves the design-tokens + Tailwind pipeline actually loaded in the test browser:
// the primary variant resolves an opaque token-backed background (not the
// transparent default). Asserting "not transparent" instead of a hardcoded hex
// keeps this green across brand re-theming.
export const CssCheck: Story = {
  args: { variant: 'primary' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Add to board' })
    await expect(getComputedStyle(button).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
  },
}
