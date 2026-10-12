import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

import { Toaster } from '../components/Toaster'
import { toast } from '../components/ToasterRoot'

// jsdom lacks matchMedia; Sonner reads it when resolving its theme.
beforeAll(() => {
  if (!window.matchMedia) {
    window.matchMedia = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })
  }
})

afterEach(() => {
  toast.dismiss()
})

describe('Toaster — imperative toasts', () => {
  it('renders a fired toast with its message', async () => {
    render(<Toaster />)
    toast('Changes saved')
    expect(await screen.findByText('Changes saved')).toBeTruthy()
  })

  it('tags toasts with the matching data-type per tone', async () => {
    render(<Toaster />)
    toast.success('Published')
    await screen.findByText('Published')
    expect(document.querySelector('[data-sonner-toast][data-type="success"]')).not.toBeNull()
  })

  it('supports the info tone', async () => {
    render(<Toaster />)
    toast.info('New version available')
    await screen.findByText('New version available')
    expect(document.querySelector('[data-sonner-toast][data-type="info"]')).not.toBeNull()
  })

  it('dismisses a toast programmatically (timer cleanup path)', async () => {
    render(<Toaster />)
    const id = toast('Temporary')
    await screen.findByText('Temporary')

    toast.dismiss(id)
    await waitFor(() => expect(screen.queryByText('Temporary')).toBeNull())
  })
})

describe('Toaster — defaults', () => {
  it('anchors bottom-right and drives the progress bar duration by default', async () => {
    render(<Toaster />)
    toast('Anchored')
    await screen.findByText('Anchored')

    const toaster = document.querySelector('[data-sonner-toaster]')
    expect(toaster?.getAttribute('data-y-position')).toBe('bottom')
    expect(toaster?.getAttribute('data-x-position')).toBe('right')
    expect((toaster as HTMLElement).style.getPropertyValue('--toast-progress-duration')).toBe(
      '4000ms'
    )
  })
})
