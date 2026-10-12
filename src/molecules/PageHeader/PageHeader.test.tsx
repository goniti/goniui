import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PageHeader } from './PageHeader'

describe('PageHeader', () => {
  it('renders the title as an h1', () => {
    render(<PageHeader title="Overview" />)
    expect(screen.getByRole('heading', { level: 1, name: 'Overview' })).toBeTruthy()
  })

  it('renders the eyebrow above the title when provided', () => {
    render(<PageHeader eyebrow="Section" title="Overview" />)
    expect(screen.getByText('Section')).toBeTruthy()
  })

  it('omits the eyebrow when not provided', () => {
    render(<PageHeader title="Overview" />)
    expect(screen.queryByText('Section')).toBeNull()
  })

  it('renders trailing content on the same row', () => {
    render(<PageHeader title="Overview">Thursday, Sept 24</PageHeader>)
    expect(screen.getByText('Thursday, Sept 24')).toBeTruthy()
  })
})
