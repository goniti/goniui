import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import * as SegmentedControl from '../index'

function renderAuthSwitch() {
  return render(
    <SegmentedControl.Root aria-label="Authentication mode">
      <SegmentedControl.Item active asChild>
        <span aria-current="page">Sign in</span>
      </SegmentedControl.Item>
      <SegmentedControl.Item asChild>
        <a href="/register">Sign up</a>
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  )
}

describe('SegmentedControl', () => {
  it('exposes the container as a labelled group', () => {
    renderAuthSwitch()
    expect(screen.getByRole('group', { name: 'Authentication mode' })).toBeTruthy()
  })

  it('renders every segment label', () => {
    renderAuthSwitch()
    expect(screen.getByText('Sign in')).toBeTruthy()
    expect(screen.getByText('Sign up')).toBeTruthy()
  })

  it('renders the inactive segment as a real link carrying its href', () => {
    renderAuthSwitch()
    const link = screen.getByRole('link', { name: 'Sign up' })
    expect(link.getAttribute('href')).toBe('/register')
  })

  it('marks the active segment with the primary fill', () => {
    renderAuthSwitch()
    const active = screen.getByText('Sign in')
    expect(active.className).toContain('bg-primary-400')
    expect(active.className).toContain('text-primary-foreground')
  })

  it('centers every segment (regression: text must not be left-aligned)', () => {
    renderAuthSwitch()
    expect(screen.getByText('Sign in').className).toContain('justify-center')
    expect(screen.getByRole('link', { name: 'Sign up' }).className).toContain('justify-center')
  })

  it('defaults to a native button when asChild is not set', () => {
    render(
      <SegmentedControl.Root>
        <SegmentedControl.Item>Solo</SegmentedControl.Item>
      </SegmentedControl.Root>
    )
    const button = screen.getByRole('button', { name: 'Solo' })
    expect(button.tagName).toBe('BUTTON')
    expect(button.getAttribute('type')).toBe('button')
  })

  it('preserves the child element under asChild (a span stays a span, not a button)', () => {
    renderAuthSwitch()
    expect(screen.getByText('Sign in').tagName).toBe('SPAN')
  })

  it('keeps a long tab label on one line (regression #1156)', () => {
    render(
      <SegmentedControl.Root aria-label="Moderation status">
        <SegmentedControl.Item active>En attente · 1</SegmentedControl.Item>
        <SegmentedControl.Item>Approved · 0</SegmentedControl.Item>
        <SegmentedControl.Item>Rejected · 2</SegmentedControl.Item>
      </SegmentedControl.Root>
    )
    const approved = screen.getByRole('button', { name: 'Approved · 0' })
    expect(approved.className).toContain('whitespace-nowrap')
    expect(approved.className).toContain('shrink-0')
  })

  it('lets the container scroll horizontally instead of wrapping when too narrow (regression #1156)', () => {
    render(
      <SegmentedControl.Root aria-label="Moderation status">
        <SegmentedControl.Item active>En attente · 1</SegmentedControl.Item>
        <SegmentedControl.Item>Approved · 0</SegmentedControl.Item>
        <SegmentedControl.Item>Rejected · 2</SegmentedControl.Item>
      </SegmentedControl.Root>
    )
    const group = screen.getByRole('group', { name: 'Moderation status' })
    expect(group.className).toContain('overflow-x-auto')
  })
})
