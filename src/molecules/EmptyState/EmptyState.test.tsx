import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="Coming soon" />)
    expect(screen.getByRole('heading', { name: 'Coming soon' })).toBeTruthy()
  })

  it('renders the description when provided', () => {
    render(<EmptyState title="Coming soon" description="This section is under construction." />)
    expect(screen.getByText('This section is under construction.')).toBeTruthy()
  })

  it('omits the description when not provided', () => {
    render(<EmptyState title="Coming soon" />)
    expect(screen.queryByText('This section is under construction.')).toBeNull()
  })

  it('renders the trailing action when provided', () => {
    render(
      <EmptyState title="No results">
        <button type="button">Retry</button>
      </EmptyState>
    )
    expect(screen.getByRole('button', { name: 'Retry' })).toBeTruthy()
  })
})
