import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import * as List from '../index'

describe('List', () => {
  it('renders as ul by default', () => {
    render(
      <List.Root>
        <List.Item>Item</List.Item>
      </List.Root>
    )
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it('renders as ol when as="ol"', () => {
    render(
      <List.Root as="ol">
        <List.Item>Item</List.Item>
      </List.Root>
    )
    expect(screen.getByRole('list').tagName).toBe('OL')
  })

  it('renders children as list items', () => {
    render(
      <List.Root>
        <List.Item>Alpha</List.Item>
        <List.Item>Beta</List.Item>
      </List.Root>
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('Alpha')).toBeTruthy()
  })
})
