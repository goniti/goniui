import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FAQItem } from '../components/FAQItem'

describe('FAQItem — content visibility', () => {
  it('renders the question and answer when open', () => {
    render(<FAQItem question="Question?" answer="Answer." defaultOpen />)
    expect(screen.getByRole('button', { name: /question\?/i })).toBeTruthy()
    expect(screen.getByText('Answer.')).toBeTruthy()
  })

  it('does not expose answer text when closed', () => {
    render(<FAQItem question="Question?" answer="Secret answer." />)
    expect(screen.queryByText('Secret answer.')).toBeNull()
  })
})

describe('FAQItem — interaction', () => {
  it('toggles open state when the trigger is clicked', () => {
    render(<FAQItem question="Question?" answer="Answer." />)

    const trigger = screen.getByRole('button', { name: /question\?/i })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByText('Answer.')).toBeTruthy()

    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByText('Answer.')).toBeNull()
  })

  it('respects defaultOpen', () => {
    render(<FAQItem question="Question?" answer="Answer." defaultOpen />)
    expect(screen.getByRole('button', { name: /question\?/i }).getAttribute('aria-expanded')).toBe(
      'true'
    )
  })

  it('calls onOpenChange when uncontrolled', () => {
    const onOpenChange = vi.fn()
    render(<FAQItem question="Question?" answer="Answer." onOpenChange={onOpenChange} />)

    fireEvent.click(screen.getByRole('button', { name: /question\?/i }))
    expect(onOpenChange).toHaveBeenCalledWith(true)

    fireEvent.click(screen.getByRole('button', { name: /question\?/i }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('calls onOpenChange in controlled mode without mutating the prop', () => {
    const onOpenChange = vi.fn()

    const { rerender } = render(
      <FAQItem question="Question?" answer="Answer." open={false} onOpenChange={onOpenChange} />
    )

    fireEvent.click(screen.getByRole('button', { name: /question\?/i }))
    expect(onOpenChange).toHaveBeenCalledWith(true)

    rerender(
      <FAQItem question="Question?" answer="Answer." open={true} onOpenChange={onOpenChange} />
    )
    expect(screen.getByRole('button', { name: /question\?/i }).getAttribute('aria-expanded')).toBe(
      'true'
    )
  })
})

describe('FAQItem — Radix Collapsible wiring (anti-regression)', () => {
  it('roots open state on Collapsible data-state', () => {
    const { container } = render(<FAQItem question="Question?" answer="Answer." defaultOpen />)

    const root = container.firstElementChild
    expect(root?.getAttribute('data-state')).toBe('open')
    expect(root?.className).toContain('group')
  })

  it('syncs trigger data-state with aria-expanded', () => {
    render(<FAQItem question="Question?" answer="Answer." />)

    const trigger = screen.getByRole('button', { name: /question\?/i })
    expect(trigger.getAttribute('data-state')).toBe('closed')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(trigger)
    expect(trigger.getAttribute('data-state')).toBe('open')
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
  })

  it('keeps smooth-collapse animation classes on the content panel', () => {
    render(<FAQItem question="Question?" answer="Answer." defaultOpen />)

    const answer = screen.getByText('Answer.')
    const panel = answer.closest('[data-state]')

    expect(panel?.className).toContain('animate-collapsible-down')
    expect(panel?.className).toContain('animate-collapsible-up')
    expect(panel?.className).toContain('overflow-hidden')
  })

  it('keeps presentational trigger styles (native button, no hover fill)', () => {
    render(<FAQItem question="Question?" answer="Answer." />)

    const trigger = screen.getByRole('button', { name: /question\?/i })
    // The pointer cursor now comes from the design-tokens reset (button:not(:disabled)).
    expect(trigger.tagName).toBe('BUTTON')
    expect(trigger.className).toContain('hover:bg-transparent')
    expect(trigger.className).not.toContain('hover:bg-neutral-50')
  })

  it('insets the separator to match content padding (not full bleed)', () => {
    const { container } = render(<FAQItem question="Question?" answer="Answer." />)

    const separator = container.querySelector('[data-slot="separator"]')
    expect(separator?.className).toContain('inset-x-8')
    expect(separator?.className).toContain('w-auto')
    expect(separator?.className).not.toContain('w-full')
  })

  it('renders the decorative chevron as aria-hidden', () => {
    const { container } = render(<FAQItem question="Question?" answer="Answer." />)

    const chevron = container.querySelector('svg[aria-hidden="true"]')
    expect(chevron).not.toBeNull()
    expect(chevron?.getAttribute('class')).toContain('lucide-chevron-down')
  })
})
