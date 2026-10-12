import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import * as Collapsible from '../index'

describe('Collapsible', () => {
  it('toggles content visibility via the Radix trigger', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Panel body</Collapsible.Content>
      </Collapsible.Root>
    )

    const trigger = screen.getByRole('button', { name: /toggle/i })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByText('Panel body')).toBeTruthy()
  })

  it('respects defaultOpen', () => {
    render(
      <Collapsible.Root defaultOpen>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Panel body</Collapsible.Content>
      </Collapsible.Root>
    )

    expect(screen.getByRole('button', { name: /toggle/i }).getAttribute('aria-expanded')).toBe(
      'true'
    )
  })

  it('keeps the animated element nude — consumer className lands on the inner wrapper', () => {
    render(
      <Collapsible.Root defaultOpen>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content className="px-5 pb-4">Panel body</Collapsible.Content>
      </Collapsible.Root>
    )

    const inner = screen.getByText('Panel body')
    const animated = inner.parentElement

    expect(inner.className).toContain('px-5')
    expect(inner.className).toContain('pb-4')

    expect(animated?.className).toContain('overflow-hidden')
    expect(animated?.className).toContain('animate-collapsible-down')
    expect(animated?.className).toContain('animate-collapsible-up')
    expect(animated?.className).not.toContain('px-5')
    expect(animated?.className).not.toContain('pb-4')
  })

  it('hides panel text when closed', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Panel body</Collapsible.Content>
      </Collapsible.Root>
    )

    expect(screen.queryByText('Panel body')).toBeNull()
  })
})
