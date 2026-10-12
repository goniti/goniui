import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Badge } from '../components/Badge'

describe('Badge', () => {
  it('renders its label with the outline variant by default', () => {
    render(<Badge>Editor</Badge>)
    const badge = screen.getByText('Editor')

    expect(badge.className).toContain('border-border')
  })

  it('renders the solid variant', () => {
    render(<Badge variant="solid">Editor</Badge>)
    const badge = screen.getByText('Editor', { exact: false })

    expect(badge.className).toContain('bg-primary-400')
  })

  it('renders no dismiss button when onRemove is omitted', () => {
    render(<Badge>Editor</Badge>)

    expect(screen.queryByRole('button')).toBeNull()
  })

  it('renders a dismiss button and calls onRemove when clicked', () => {
    const onRemove = vi.fn()
    render(
      <Badge onRemove={onRemove} removeLabel="Retirer Editor">
        Editor
      </Badge>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Retirer Editor' }))

    expect(onRemove).toHaveBeenCalledOnce()
  })
})
