import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '@/atoms/Button'

import * as Dialog from '../index'

function TestDialog({
  size,
  defaultOpen,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  defaultOpen?: boolean
}) {
  return (
    <Dialog.Root defaultOpen={defaultOpen}>
      <Dialog.Trigger asChild>
        <Button>Open</Button>
      </Dialog.Trigger>
      <Dialog.Content size={size}>
        <Dialog.Title>Dialog title</Dialog.Title>
        <Dialog.Description>Dialog description</Dialog.Description>
        <Dialog.Close asChild>
          <Button>Close</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}

describe('Dialog', () => {
  it('opens when the trigger is clicked', () => {
    render(<TestDialog />)

    expect(screen.queryByRole('dialog')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /open/i }))

    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(screen.getByText('Dialog title')).toBeTruthy()
    expect(screen.getByText('Dialog description')).toBeTruthy()
  })

  it('closes when the close button is clicked', () => {
    render(<TestDialog />)

    fireEvent.click(screen.getByRole('button', { name: /open/i }))
    expect(screen.getByRole('dialog')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders open by default when defaultOpen is true', () => {
    render(<TestDialog defaultOpen />)

    expect(screen.getByRole('dialog')).toBeTruthy()
  })

  it('ships animation classes on the overlay (anti-regression)', () => {
    render(<TestDialog defaultOpen />)

    // Radix Dialog renders the overlay as a div with data-[state=...]:animate-* class strings.
    // Query by substring of the class attribute to locate it without hard-coding a fragile selector.
    const overlay = document.querySelector('[class*="dialog-overlay-in"]') as HTMLElement | null
    expect(overlay).not.toBeNull()
    expect(overlay!.className).toContain('animate-dialog-overlay-in')
    expect(overlay!.className).toContain('animate-dialog-overlay-out')
  })

  it('ships animation classes on the content (anti-regression)', () => {
    render(<TestDialog defaultOpen />)

    const content = screen.getByRole('dialog')
    expect(content.className).toContain('animate-dialog-content-in')
    expect(content.className).toContain('animate-dialog-content-out')
  })

  it('applies the correct size class for sm', () => {
    render(<TestDialog defaultOpen size="sm" />)

    expect(screen.getByRole('dialog').className).toContain('max-w-sm')
  })

  it('applies the correct size class for lg', () => {
    render(<TestDialog defaultOpen size="lg" />)

    expect(screen.getByRole('dialog').className).toContain('max-w-lg')
  })

  it('defaults to md size', () => {
    render(<TestDialog defaultOpen />)

    expect(screen.getByRole('dialog').className).toContain('max-w-md')
  })

  it('has accessible title linked via aria-labelledby', () => {
    render(<TestDialog defaultOpen />)

    const dialog = screen.getByRole('dialog')
    const labelledBy = dialog.getAttribute('aria-labelledby')
    expect(labelledBy).toBeTruthy()

    const titleEl = document.getElementById(labelledBy!)
    expect(titleEl?.textContent).toBe('Dialog title')
  })

  it('has accessible description linked via aria-describedby', () => {
    render(<TestDialog defaultOpen />)

    const dialog = screen.getByRole('dialog')
    const describedBy = dialog.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()

    const descEl = document.getElementById(describedBy!)
    expect(descEl?.textContent).toBe('Dialog description')
  })
})
