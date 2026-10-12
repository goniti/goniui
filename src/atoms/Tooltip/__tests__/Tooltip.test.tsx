import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import * as Tooltip from '../index'

function TestTooltip({
  content = 'Tooltip text',
  keys,
  defaultOpen,
}: {
  content?: string
  keys?: string[]
  defaultOpen?: boolean
}) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root defaultOpen={defaultOpen}>
        <Tooltip.Trigger asChild>
          <button type="button">Trigger</button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          {content}
          {keys !== undefined && <Tooltip.KeysChip keys={keys} />}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

describe('Tooltip', () => {
  it('renders the trigger', () => {
    render(<TestTooltip />)
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeTruthy()
  })

  it('shows content when defaultOpen is true', () => {
    render(<TestTooltip defaultOpen />)
    // Radix renders both a visible content panel and a hidden role="tooltip" span with
    // the same text — use getAllByText and verify at least one instance appears.
    const matches = screen.getAllByText('Tooltip text')
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('hides content when not open', () => {
    render(<TestTooltip />)
    expect(screen.queryByRole('tooltip')).toBeNull()
  })

  it('renders key-combo chips when keys are provided', () => {
    render(<TestTooltip defaultOpen keys={['G', 'B']} />)

    // Since the 2026-07 Radix bump the visible panel itself carries role="tooltip"
    // (no more hidden a11y mirror) — query the kbd chips directly inside it.
    const styledPanel = document.querySelector('.bg-surface-inverse')
    expect(styledPanel).not.toBeNull()
    const visibleKbdElements = Array.from(styledPanel!.querySelectorAll('kbd'))
    expect(visibleKbdElements).toHaveLength(2)
    expect(visibleKbdElements[0].textContent).toBe('G')
    expect(visibleKbdElements[1].textContent).toBe('B')
  })

  it('renders multiple keys as individual kbd elements', () => {
    render(<TestTooltip defaultOpen keys={['⌘', 'K']} />)

    // Visible panel = role="tooltip" since the Radix bump — no mirror to exclude.
    const styledPanel = document.querySelector('.bg-surface-inverse')
    expect(styledPanel).not.toBeNull()
    const visibleKbdElements = Array.from(styledPanel!.querySelectorAll('kbd'))
    expect(visibleKbdElements).toHaveLength(2)
    expect(visibleKbdElements[0].textContent).toBe('⌘')
    expect(visibleKbdElements[1].textContent).toBe('K')
  })

  it('applies tooltipContentVariants base classes to the content panel', () => {
    render(<TestTooltip defaultOpen />)
    // Portal renders to document.body — the styled panel is accessible via document.
    const styledPanel = document.querySelector('.bg-surface-inverse')
    expect(styledPanel).not.toBeNull()
    expect(styledPanel!.className).toContain('text-foreground-inverse')
  })

  it('the trigger has asChild wiring — renders as the child element', () => {
    render(
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button type="button">My button</button>
          </Tooltip.Trigger>
          <Tooltip.Content>Label</Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    )

    // asChild means no extra wrapper element — the button is the trigger.
    const trigger = screen.getByRole('button', { name: 'My button' })
    expect(trigger.tagName.toLowerCase()).toBe('button')
  })

  it('TooltipProvider renders without error', () => {
    const { container } = render(
      <Tooltip.Provider>
        <span>child</span>
      </Tooltip.Provider>
    )
    expect(container.textContent).toBe('child')
  })

  it('supports a custom delayDuration via provider', () => {
    render(
      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button type="button">Fast trigger</button>
          </Tooltip.Trigger>
          <Tooltip.Content>Fast content</Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    )
    expect(screen.getByRole('button', { name: 'Fast trigger' })).toBeTruthy()
  })
})

describe('TooltipKeysChip', () => {
  it('renders each key as a kbd element', () => {
    render(
      <Tooltip.Provider>
        <Tooltip.Root defaultOpen>
          <Tooltip.Trigger asChild>
            <span>trigger</span>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.KeysChip keys={['Ctrl', 'S']} />
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    )

    // Visible panel = role="tooltip" since the Radix bump — no mirror to exclude.
    const styledPanel = document.querySelector('.bg-surface-inverse')
    expect(styledPanel).not.toBeNull()
    const visibleKbdElements = Array.from(styledPanel!.querySelectorAll('kbd'))
    expect(visibleKbdElements).toHaveLength(2)
    expect(visibleKbdElements[0].textContent).toBe('Ctrl')
    expect(visibleKbdElements[1].textContent).toBe('S')
  })

  it('renders nothing when keys array is empty', () => {
    render(
      <Tooltip.Provider>
        <Tooltip.Root defaultOpen>
          <Tooltip.Trigger asChild>
            <span>trigger</span>
          </Tooltip.Trigger>
          <Tooltip.Content>
            label <Tooltip.KeysChip keys={[]} />
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    )
    const styledPanel = document.querySelector('.bg-surface-inverse')
    const kbdElements = styledPanel ? styledPanel.querySelectorAll('kbd') : []
    expect(kbdElements).toHaveLength(0)
  })
})
