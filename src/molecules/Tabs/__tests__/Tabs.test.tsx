import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import * as Tabs from '../index'

describe('Tabs', () => {
  function switchTab(name: RegExp) {
    // Radix Tabs v1.1 activates on mousedown (not click) — reflect that here.
    fireEvent.mouseDown(screen.getByRole('tab', { name }))
  }

  function renderTabs(defaultValue = 'account') {
    return render(
      <Tabs.Root defaultValue={defaultValue}>
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">Account content</Tabs.Content>
        <Tabs.Content value="password">Password content</Tabs.Content>
      </Tabs.Root>
    )
  }

  it('renders the active tab panel on mount', () => {
    renderTabs('account')

    expect(screen.getByText('Account content')).toBeTruthy()
    expect(screen.queryByText('Password content')).toBeNull()
  })

  it('switches panel on trigger click', () => {
    renderTabs('account')

    switchTab(/password/i)

    expect(screen.getByText('Password content')).toBeTruthy()
    // Account panel is lazy-unmounted by Radix once the password panel is active
    expect(screen.queryByText('Account content')).toBeNull()
  })

  it('marks the active trigger with aria-selected=true', () => {
    renderTabs('account')

    const accountTab = screen.getByRole('tab', { name: /account/i })
    const passwordTab = screen.getByRole('tab', { name: /password/i })

    expect(accountTab.getAttribute('aria-selected')).toBe('true')
    expect(passwordTab.getAttribute('aria-selected')).toBe('false')
  })

  it('updates aria-selected when switching tabs', () => {
    renderTabs('account')

    switchTab(/password/i)

    expect(screen.getByRole('tab', { name: /password/i }).getAttribute('aria-selected')).toBe(
      'true'
    )
    expect(screen.getByRole('tab', { name: /account/i }).getAttribute('aria-selected')).toBe(
      'false'
    )
  })

  it('respects the disabled prop on a trigger', () => {
    render(
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password" disabled>
            Password
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">Account content</Tabs.Content>
        <Tabs.Content value="password">Password content</Tabs.Content>
      </Tabs.Root>
    )

    const disabledTab = screen.getByRole('tab', { name: /password/i })
    expect(disabledTab).toHaveProperty('disabled', true)
    fireEvent.mouseDown(disabledTab)
    expect(screen.queryByText('Password content')).toBeNull()
  })

  it('ships list variant classes on TabsList (anti-regression)', () => {
    renderTabs()

    const list = screen.getByRole('tablist')
    expect(list.className).toContain('bg-surface-2')
    expect(list.className).toContain('rounded-lg')
  })

  it('ships active-state classes on the active TabsTrigger (anti-regression)', () => {
    renderTabs('account')

    const accountTab = screen.getByRole('tab', { name: /account/i })
    expect(accountTab.className).toContain('data-[state=active]:bg-primary-400')
  })

  it('exposes the panel via role=tabpanel with correct labelling', () => {
    renderTabs('account')

    const panel = screen.getByRole('tabpanel')
    expect(panel).toBeTruthy()
    expect(panel.getAttribute('aria-labelledby')).toBeTruthy()
  })

  function renderSegmentTabs() {
    return render(
      <Tabs.Root variant="segment" defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">Account content</Tabs.Content>
        <Tabs.Content value="password">Password content</Tabs.Content>
      </Tabs.Root>
    )
  }

  it('applies segment-variant classes to the list', () => {
    renderSegmentTabs()

    const list = screen.getByRole('tablist')
    expect(list.className).toContain('rounded-xl')
    expect(list.className).toContain('border-border')
  })

  it('applies equal-width segment classes to the triggers', () => {
    renderSegmentTabs()

    const accountTab = screen.getByRole('tab', { name: /account/i })
    expect(accountTab.className).toContain('flex-1')
    expect(accountTab.className).toContain('data-[state=active]:bg-primary-400')
  })

  it('keeps full tab/tabpanel semantics under the segment variant', () => {
    renderSegmentTabs()

    switchTab(/password/i)

    expect(screen.getByText('Password content')).toBeTruthy()
    expect(screen.getByRole('tab', { name: /password/i }).getAttribute('aria-selected')).toBe(
      'true'
    )
  })
})
