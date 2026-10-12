import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FAQItem } from '../components/FAQItem'
import { FAQRoot } from '../components/FAQRoot'

describe('FAQRoot', () => {
  it('renders composed FAQ items inside the card shell', () => {
    render(
      <FAQRoot>
        <FAQItem question="First?" answer="First answer." />
        <FAQItem question="Second?" answer="Second answer." defaultOpen />
      </FAQRoot>
    )

    expect(screen.getByRole('button', { name: /first\?/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /second\?/i })).toBeTruthy()
    expect(screen.getByText('Second answer.')).toBeTruthy()
  })

  it('keeps the last-item divider suppression rule on the card', () => {
    const { container } = render(
      <FAQRoot>
        <FAQItem question="Only?" answer="Only answer." />
      </FAQRoot>
    )

    const card = container.firstElementChild
    expect(card?.className).toContain('[&>*:last-child>[data-slot=separator]]:hidden')
    expect(card?.className).toContain('shadow-lg')
  })
})
