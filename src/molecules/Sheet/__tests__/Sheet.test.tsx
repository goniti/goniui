import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '@/atoms/Button'

import * as Sheet from '../index'

function TestSheet({ defaultOpen, hideHandle }: { defaultOpen?: boolean; hideHandle?: boolean }) {
  return (
    <Sheet.Root defaultOpen={defaultOpen}>
      <Sheet.Trigger asChild>
        <Button>Open</Button>
      </Sheet.Trigger>
      <Sheet.Content hideHandle={hideHandle} aria-label="Test sheet">
        <div className="p-4">
          <p>Sheet body content</p>
          <Sheet.Close asChild>
            <Button>Close</Button>
          </Sheet.Close>
        </div>
      </Sheet.Content>
    </Sheet.Root>
  )
}

describe('Sheet', () => {
  it('does not render content before the trigger is clicked', () => {
    render(<TestSheet />)
    expect(screen.queryByText('Sheet body content')).toBeNull()
  })

  it('renders content after trigger click', () => {
    render(<TestSheet />)
    fireEvent.click(screen.getByRole('button', { name: /open/i }))
    expect(screen.getByText('Sheet body content')).toBeTruthy()
  })

  it('renders open by default when defaultOpen is true', () => {
    render(<TestSheet defaultOpen />)
    expect(screen.getByText('Sheet body content')).toBeTruthy()
  })

  it('has dialog role with an accessible label', () => {
    render(<TestSheet defaultOpen />)
    expect(screen.getByRole('dialog', { name: 'Test sheet' })).toBeTruthy()
  })

  /**
   * Radix Dialog closes synchronously in jsdom — `data-[state=closed]` is applied
   * and content is hidden without waiting for a CSS transition.
   */
  it('transitions to closed state when the close button is clicked', () => {
    render(<TestSheet defaultOpen />)
    const dialog = screen.getByRole('dialog')
    expect(dialog.getAttribute('data-state')).toBe('open')

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /close/i }))
    })

    expect(dialog.getAttribute('data-state')).toBe('closed')
  })

  it('transitions to closed state on Escape key press', () => {
    render(<TestSheet defaultOpen />)
    const dialog = screen.getByRole('dialog')
    expect(dialog.getAttribute('data-state')).toBe('open')

    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' })
    })

    expect(dialog.getAttribute('data-state')).toBe('closed')
  })

  it('shows the handle bar by default', () => {
    render(<TestSheet defaultOpen />)
    const handle = document.querySelector('[data-sheet-handle]')
    expect(handle).not.toBeNull()
  })

  it('hides the handle bar when hideHandle is true', () => {
    render(<TestSheet defaultOpen hideHandle />)
    const handle = document.querySelector('[data-sheet-handle]')
    expect(handle).toBeNull()
  })

  it('applies the inset variant class on the content panel', () => {
    render(
      <Sheet.Root defaultOpen>
        <Sheet.Content inset="lg" aria-label="Inset test">
          <p>Content</p>
        </Sheet.Content>
      </Sheet.Root>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('top-20')
  })

  it('applies the overlay with backdrop-blur class', () => {
    render(<TestSheet defaultOpen />)
    const overlay = document.querySelector('[data-sheet-overlay]')
    expect(overlay).not.toBeNull()
    expect(overlay!.className).toContain('backdrop-blur-sm')
  })

  describe('snapPoints', () => {
    function SnapSheet() {
      return (
        <Sheet.Root defaultOpen>
          <Sheet.Content
            snapPoints={[25, 50, 90]}
            handleLabel="Resize sheet"
            aria-label="Snap sheet"
          >
            <p>Snap sheet content</p>
          </Sheet.Content>
        </Sheet.Root>
      )
    }

    it('opens at the largest snap point', () => {
      render(<SnapSheet />)
      expect(screen.getByRole('dialog').style.height).toBe('90dvh')
    })

    it('exposes the handle as a slider with the current value', () => {
      render(<SnapSheet />)
      const handle = screen.getByRole('slider', { name: 'Resize sheet' })
      expect(handle.getAttribute('aria-valuemin')).toBe('25')
      expect(handle.getAttribute('aria-valuemax')).toBe('90')
      expect(handle.getAttribute('aria-valuenow')).toBe('90')
    })

    it('steps down to the next smaller snap point on ArrowDown', () => {
      render(<SnapSheet />)
      const handle = screen.getByRole('slider', { name: 'Resize sheet' })

      fireEvent.keyDown(handle, { key: 'ArrowDown' })

      expect(screen.getByRole('dialog').style.height).toBe('50dvh')
    })

    it('jumps to the smallest snap point on Home', () => {
      render(<SnapSheet />)
      const handle = screen.getByRole('slider', { name: 'Resize sheet' })

      fireEvent.keyDown(handle, { key: 'Home' })

      expect(screen.getByRole('dialog').style.height).toBe('25dvh')
    })

    it('snaps to the closest point when the drag is released', () => {
      render(<SnapSheet />)
      const handle = screen.getByRole('slider', { name: 'Resize sheet' })

      fireEvent.pointerDown(handle, { clientY: 100, pointerId: 1 })
      fireEvent.pointerMove(handle, { clientY: 650 })
      fireEvent.pointerUp(handle)

      expect(screen.getByRole('dialog').style.height).toBe('25dvh')
    })

    it('closes the sheet when dragged below half the smallest snap point', () => {
      render(<SnapSheet />)
      const handle = screen.getByRole('slider', { name: 'Resize sheet' })
      const dialog = screen.getByRole('dialog')

      fireEvent.pointerDown(handle, { clientY: 100, pointerId: 1 })
      fireEvent.pointerMove(handle, { clientY: 750 })
      fireEvent.pointerUp(handle)

      expect(dialog.getAttribute('data-state')).toBe('closed')
    })
  })
})
