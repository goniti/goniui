import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import * as DropdownMenu from '@/molecules/DropdownMenu'

import * as Sidebar from '../index'

function openMenu(trigger: HTMLElement) {
  // Radix DropdownMenu listens to pointerdown on the trigger button.
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: 'mouse' })
  fireEvent.click(trigger)
}

describe('Sidebar', () => {
  describe('Root', () => {
    it('renders a <nav> landmark with the supplied accessible name', () => {
      const { container } = render(<Sidebar.Root aria-label="Main navigation">x</Sidebar.Root>)
      const nav = container.querySelector('nav')
      expect(nav).not.toBeNull()
      expect(nav?.getAttribute('aria-label')).toBe('Main navigation')
    })

    it('defaults the nav label to "Sidebar"', () => {
      const { container } = render(<Sidebar.Root>x</Sidebar.Root>)
      expect(container.querySelector('nav')?.getAttribute('aria-label')).toBe('Sidebar')
    })
  })

  describe('Header', () => {
    it('keeps the same fixed height whether the sidebar is expanded or collapsed (regression #1150)', () => {
      const { container: expandedContainer } = render(
        <Sidebar.Root>
          <Sidebar.Header>Wordmark + Badge</Sidebar.Header>
        </Sidebar.Root>
      )
      const { container: collapsedContainer } = render(
        <Sidebar.Root defaultMode="collapsed">
          <Sidebar.Header>M</Sidebar.Header>
        </Sidebar.Root>
      )
      const expandedHeader = expandedContainer.querySelector('nav > div')
      const collapsedHeader = collapsedContainer.querySelector('nav > div')
      expect(expandedHeader?.className).toContain('h-12')
      expect(collapsedHeader?.className).toContain('h-12')
    })
  })

  describe('GroupLabel', () => {
    it('keeps the same fixed height whether the sidebar is expanded or collapsed (regression #1150)', () => {
      const { container: expandedContainer } = render(
        <Sidebar.Root>
          <Sidebar.GroupLabel>Organization</Sidebar.GroupLabel>
        </Sidebar.Root>
      )
      const { container: collapsedContainer } = render(
        <Sidebar.Root defaultMode="collapsed">
          <Sidebar.GroupLabel>Organization</Sidebar.GroupLabel>
        </Sidebar.Root>
      )
      const expandedLabel = expandedContainer.querySelector('nav > div')
      const collapsedLabel = collapsedContainer.querySelector('nav > div')
      expect(expandedLabel?.className).toContain('h-8')
      expect(collapsedLabel?.className).toContain('h-8')
    })

    it('shows a decorative separator instead of the text once collapsed, keeping the text for screen readers', () => {
      const { container } = render(
        <Sidebar.Root defaultMode="collapsed">
          <Sidebar.GroupLabel>Organization</Sidebar.GroupLabel>
        </Sidebar.Root>
      )
      expect(container.querySelector('[data-slot="separator"]')).not.toBeNull()
      expect(screen.getByText('Organization').className).toContain('sr-only')
    })

    it('shows the text visibly and no separator when expanded', () => {
      const { container } = render(
        <Sidebar.Root>
          <Sidebar.GroupLabel>Organization</Sidebar.GroupLabel>
        </Sidebar.Root>
      )
      expect(container.querySelector('[data-slot="separator"]')).toBeNull()
      expect(screen.getByText('Organization').className).not.toContain('sr-only')
    })

    it('keeps the text on a single line while the rail widens, so the group below never jumps', () => {
      render(
        <Sidebar.Root>
          <Sidebar.GroupLabel>Super admin</Sidebar.GroupLabel>
        </Sidebar.Root>
      )
      expect(screen.getByText('Super admin').className).toContain('truncate')
    })
  })

  describe('Group', () => {
    it('renders a <ul> of items', () => {
      const { container } = render(
        <Sidebar.Group>
          <Sidebar.Item href="/a" label="A" />
          <Sidebar.Item href="/b" label="B" />
        </Sidebar.Group>
      )
      expect(container.querySelector('ul')).not.toBeNull()
      expect(container.querySelectorAll('a')).toHaveLength(2)
    })
  })

  describe('Item', () => {
    it('renders an anchor with the href + label', () => {
      render(<Sidebar.Item href="/projects" label="Projects" />)
      expect(screen.getByRole('link', { name: 'Projects' }).getAttribute('href')).toBe('/projects')
    })

    it('sets aria-current="page" + active styles when active', () => {
      const { container } = render(<Sidebar.Item href="/" active label="Home" />)
      const anchor = container.querySelector('a')
      expect(anchor?.getAttribute('aria-current')).toBe('page')
      expect(anchor?.className).toContain('bg-primary-400/10')
    })

    it('omits aria-current when not active', () => {
      const { container } = render(<Sidebar.Item href="/x" label="X" />)
      expect(container.querySelector('a')?.hasAttribute('aria-current')).toBe(false)
    })

    it('asChild renders the injected child, merging variants + aria-current', () => {
      const { container } = render(
        <Sidebar.Item asChild active>
          <a data-router href="/projects">
            Projects
          </a>
        </Sidebar.Item>
      )
      const anchors = container.querySelectorAll('a')
      expect(anchors).toHaveLength(1)
      expect(anchors[0]?.hasAttribute('data-router')).toBe(true)
      expect(anchors[0]?.getAttribute('aria-current')).toBe('page')
      expect(anchors[0]?.className).toContain('bg-primary-400/10')
    })

    it('asChild injects icon + label into an otherwise-empty child, giving it an accessible name (regression #1145)', () => {
      render(
        <Sidebar.Item
          asChild
          active
          label="Utilisateurs"
          icon={<span data-testid="icon" aria-hidden />}
        >
          <a data-router href="/users" />
        </Sidebar.Item>
      )
      const link = screen.getByRole('link', { name: 'Utilisateurs' })
      expect(link.getAttribute('aria-current')).toBe('page')
      expect(screen.getByTestId('icon')).toBeTruthy()
    })
  })

  describe('Item badge', () => {
    it('renders nothing when badge is omitted or 0', () => {
      const { container } = render(<Sidebar.Item href="/x" label="Projects" badge={0} />)
      expect(container.querySelector('[aria-hidden="true"]')).toBeNull()
    })

    it('shows the badge inline at the end of the row when expanded', () => {
      render(<Sidebar.Item href="/x" label="Projects" badge={3} />)
      expect(screen.getByText('3')).toBeTruthy()
    })

    it('caps the visible badge at "9+" above the threshold', () => {
      render(<Sidebar.Item href="/x" label="Projects" badge={12} />)
      expect(screen.getByText('9+')).toBeTruthy()
      expect(screen.queryByText('12')).toBeNull()
    })

    it('pins the badge to the icon’s corner when collapsed instead of the row', () => {
      render(
        <Sidebar.Root defaultMode="collapsed">
          <Sidebar.Group>
            <Sidebar.Item
              href="/x"
              label="Projects"
              icon={<span data-testid="icon" aria-hidden />}
              badge={5}
            />
          </Sidebar.Group>
        </Sidebar.Root>
      )
      const iconWrapper = screen.getByTestId('icon').parentElement
      expect(iconWrapper?.className).toContain('relative')
      const pastille = iconWrapper?.querySelector('[aria-hidden="true"]:not([data-testid="icon"])')
      expect(pastille?.textContent).toBe('5')
      expect(pastille?.className).toContain('absolute')
    })

    it('keeps the same row height with or without a badge', () => {
      const { container: withoutBadge } = render(<Sidebar.Item href="/x" label="Projects" />)
      const { container: withBadge } = render(<Sidebar.Item href="/x" label="Projects" badge={2} />)
      expect(withoutBadge.querySelector('a')?.className).toBe(
        withBadge.querySelector('a')?.className
      )
    })

    it('announces the badge label as part of the accessible name', () => {
      render(
        <Sidebar.Item href="/moderation" label="Moderation" badge={1} badgeLabel="1 pending" />
      )
      expect(screen.getByRole('link', { name: 'Moderation 1 pending' })).toBeTruthy()
    })

    it('does not touch the accessible name when badge is 0, even with a badgeLabel', () => {
      render(
        <Sidebar.Item href="/moderation" label="Moderation" badge={0} badgeLabel="0 pending" />
      )
      expect(screen.getByRole('link', { name: 'Moderation' })).toBeTruthy()
    })

    it('works with asChild: badge shown and its label announced', () => {
      render(
        <Sidebar.Item asChild label="Moderation" badge={2} badgeLabel="2 pending">
          <a data-router href="/moderation" />
        </Sidebar.Item>
      )
      expect(screen.getByRole('link', { name: 'Moderation 2 pending' })).toBeTruthy()
      expect(screen.getByText('2')).toBeTruthy()
    })
  })

  describe('display modes', () => {
    it('is expanded by default (w-60, visible label)', () => {
      const { container } = render(
        <Sidebar.Root>
          <Sidebar.Group>
            <Sidebar.Item href="/x" label="Projects" />
          </Sidebar.Group>
        </Sidebar.Root>
      )
      expect(container.querySelector('nav')?.className).toContain('w-60')
      expect(container.querySelector('.sr-only')).toBeNull()
    })

    it('collapses to w-16, keeping the label as the link accessible name (truncated, not removed)', () => {
      const { container } = render(
        <Sidebar.Root defaultMode="collapsed">
          <Sidebar.Group>
            <Sidebar.Item href="/x" label="Projects" />
          </Sidebar.Group>
        </Sidebar.Root>
      )
      expect(container.querySelector('nav')?.className).toContain('w-16')
      // The label stays in the DOM (clipped via truncate) so the link keeps its name.
      expect(screen.getByRole('link', { name: 'Projects' })).toBeTruthy()
    })
  })

  describe('ModeControl', () => {
    it('renders a labelled trigger inside the sidebar', () => {
      render(
        <Sidebar.Root>
          <Sidebar.Footer>
            <Sidebar.ModeControl
              label="Sidebar control"
              expandedLabel="Expanded"
              collapsedLabel="Collapsed"
              hoverLabel="Expand on hover"
            />
          </Sidebar.Footer>
        </Sidebar.Root>
      )
      expect(screen.getByRole('button', { name: 'Sidebar control' })).toBeTruthy()
    })
  })

  describe('shortcuts', () => {
    it('activates the item when its shortcut sequence is typed', () => {
      const onClick = vi.fn()
      render(
        <Sidebar.Root>
          <Sidebar.Group>
            <Sidebar.Item href="#b" label="Billing" shortcut={['g', 'b']} onClick={onClick} />
          </Sidebar.Group>
        </Sidebar.Root>
      )
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g', bubbles: true }))
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }))
      })
      expect(onClick).toHaveBeenCalled()
    })

    it('does not activate the item and shows no hint chip once shortcuts are disabled', () => {
      const onClick = vi.fn()
      render(
        <Sidebar.Root shortcutsEnabled={false}>
          <Sidebar.Group>
            <Sidebar.Item href="#b" label="Billing" shortcut={['g', 'b']} onClick={onClick} />
          </Sidebar.Group>
        </Sidebar.Root>
      )
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g', bubbles: true }))
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }))
      })
      expect(onClick).not.toHaveBeenCalled()

      // No hint at all once disabled: expanded + no active shortcut means no tooltip wrapper.
      fireEvent.mouseOver(screen.getByRole('link', { name: 'Billing' }))
      expect(screen.queryByRole('tooltip')).toBeNull()
    })
  })

  describe('ModeControl shortcuts toggle', () => {
    it('omits the toggle when no shortcutsLabel is passed', () => {
      render(
        <Sidebar.Root>
          <Sidebar.Footer>
            <Sidebar.ModeControl
              label="Sidebar control"
              expandedLabel="Expanded"
              collapsedLabel="Collapsed"
              hoverLabel="Expand on hover"
            />
          </Sidebar.Footer>
        </Sidebar.Root>
      )
      openMenu(screen.getByRole('button', { name: 'Sidebar control' }))
      expect(screen.queryByRole('menuitemcheckbox')).toBeNull()
    })

    it('toggles shortcutsEnabled via the checkbox item', async () => {
      const onShortcutsEnabledChange = vi.fn()
      render(
        <Sidebar.Root onShortcutsEnabledChange={onShortcutsEnabledChange}>
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
      )
      openMenu(screen.getByRole('button', { name: 'Sidebar control' }))
      const checkbox = await screen.findByRole('menuitemcheckbox', { name: 'Keyboard shortcuts' })
      expect(checkbox.getAttribute('aria-checked')).toBe('true')

      fireEvent.click(checkbox)
      expect(onShortcutsEnabledChange).toHaveBeenCalledWith(false)
    })
  })

  describe('ModeControl children slot', () => {
    it('omits the extra section when no children are passed', () => {
      render(
        <Sidebar.Root>
          <Sidebar.Footer>
            <Sidebar.ModeControl
              label="Sidebar control"
              expandedLabel="Expanded"
              collapsedLabel="Collapsed"
              hoverLabel="Expand on hover"
            />
          </Sidebar.Footer>
        </Sidebar.Root>
      )
      openMenu(screen.getByRole('button', { name: 'Sidebar control' }))
      expect(screen.queryByRole('menuitemradio', { name: 'Dark' })).toBeNull()
    })

    it('renders arbitrary DropdownMenu content passed as children', () => {
      render(
        <Sidebar.Root>
          <Sidebar.Footer>
            <Sidebar.ModeControl
              label="Sidebar control"
              expandedLabel="Expanded"
              collapsedLabel="Collapsed"
              hoverLabel="Expand on hover"
            >
              <DropdownMenu.RadioGroup value="light">
                <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </Sidebar.ModeControl>
          </Sidebar.Footer>
        </Sidebar.Root>
      )
      openMenu(screen.getByRole('button', { name: 'Sidebar control' }))
      expect(screen.getByRole('menuitemradio', { name: 'Dark' })).toBeTruthy()
    })
  })

  describe('Mobile', () => {
    it('renders a labelled burger trigger', () => {
      // jsdom has no matchMedia; the mobile Sheet render needs it stubbed.
      vi.stubGlobal(
        'matchMedia',
        vi.fn(() => ({
          matches: false,
          media: '',
          addEventListener: () => {},
          removeEventListener: () => {},
        }))
      )
      render(
        <Sidebar.Mobile triggerLabel="Open menu" label="Main navigation">
          <Sidebar.Group>
            <Sidebar.Item href="/x" label="Projects" />
          </Sidebar.Group>
        </Sidebar.Mobile>
      )
      expect(screen.getByRole('button', { name: 'Open menu' })).toBeTruthy()
      vi.unstubAllGlobals()
    })
  })
})
