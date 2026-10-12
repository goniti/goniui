import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FormCheckbox } from '../components/FormCheckbox'

describe('FormCheckbox', () => {
  it('gives each checkbox its own id, so two on a page do not collide', () => {
    render(
      <>
        <FormCheckbox label="Accept the terms" name="terms" />
        <FormCheckbox label="Recevoir la newsletter" name="newsletter" />
      </>
    )

    const [first, second] = screen.getAllByRole('checkbox')
    expect(first.id).not.toBe('')
    expect(first.id).not.toBe(second.id)
  })

  it('links the label to its own input', async () => {
    render(
      <>
        <FormCheckbox label="Accept the terms" name="terms" />
        <FormCheckbox label="Recevoir la newsletter" name="newsletter" />
      </>
    )

    // getByLabelText resolves through htmlFor → id: a shared id would hand back
    // the wrong input (or throw on the duplicate).
    const newsletter = screen.getByLabelText('Recevoir la newsletter')
    expect(newsletter).toBe(screen.getAllByRole('checkbox')[1])
  })

  it('keeps an explicit id — callers that pass one stay in control', () => {
    render(<FormCheckbox label="Accept the terms" id="terms-checkbox" />)

    expect(screen.getByRole('checkbox').id).toBe('terms-checkbox')
  })
})
