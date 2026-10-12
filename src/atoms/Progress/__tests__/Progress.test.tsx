import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Progress } from '../components/Progress'

describe('Progress', () => {
  it('renders a progressbar role', () => {
    const { getByRole } = render(<Progress value={50} label="Loading" />)
    expect(getByRole('progressbar')).not.toBeNull()
  })

  it('sets aria-valuenow/min/max for determinate mode', () => {
    const { getByRole } = render(<Progress value={75} label="Loading" />)
    const el = getByRole('progressbar')

    expect(el.getAttribute('aria-valuenow')).toBe('75')
    expect(el.getAttribute('aria-valuemin')).toBe('0')
    expect(el.getAttribute('aria-valuemax')).toBe('100')
  })

  it('clamps values above 100 to 100', () => {
    const { getByRole } = render(<Progress value={150} label="Loading" />)
    const el = getByRole('progressbar')

    expect(el.getAttribute('aria-valuenow')).toBe('100')
  })

  it('clamps values below 0 to 0', () => {
    const { getByRole } = render(<Progress value={-20} label="Loading" />)
    const el = getByRole('progressbar')

    expect(el.getAttribute('aria-valuenow')).toBe('0')
  })

  it('is indeterminate when indeterminate prop is set (Radix value=null)', () => {
    const { getByRole } = render(<Progress indeterminate label="Loading" />)
    const el = getByRole('progressbar')

    expect(el.getAttribute('aria-valuenow')).toBeNull()
    expect(el.getAttribute('data-state')).toBe('indeterminate')
    expect(el.getAttribute('data-indeterminate')).toBe('true')
  })

  it('is indeterminate when no value is provided', () => {
    const { getByRole } = render(<Progress label="Loading" />)
    const el = getByRole('progressbar')

    expect(el.getAttribute('data-state')).toBe('indeterminate')
    expect(el.getAttribute('data-indeterminate')).toBe('true')
  })

  it('sets the indicator transform via inline style (shadcn / Radix pattern)', () => {
    const { container } = render(<Progress value={60} label="Loading" />)
    const indicator = container.querySelector('[data-slot="progress-indicator"]') as HTMLElement

    expect(indicator.style.transform).toBe('translateX(-40%)')
  })

  it('renders the accessible label', () => {
    const { getByRole } = render(<Progress value={30} label="Uploading file" />)
    expect(getByRole('progressbar').getAttribute('aria-label')).toBe('Uploading file')
  })

  it('merges a consumer className', () => {
    const { container } = render(<Progress value={50} label="Loading" className="my-4" />)
    const el = container.querySelector('[data-slot="progress"]')

    expect(el?.className).toContain('my-4')
  })

  it('renders the percentage when showValue is set (determinate only)', () => {
    const { getByText, queryByText, rerender } = render(
      <Progress value={65} showValue label="Loading" />
    )
    expect(getByText('65%')).not.toBeNull()

    rerender(<Progress showValue indeterminate label="Loading" />)
    expect(queryByText(/%$/)).toBeNull()
  })

  describe('circular shape', () => {
    it('keeps the progressbar role and aria-value semantics', () => {
      const { getByRole, container } = render(
        <Progress shape="circular" value={40} label="Loading" />
      )
      const el = getByRole('progressbar')
      expect(el.getAttribute('aria-valuenow')).toBe('40')
      expect(container.querySelector('svg')).not.toBeNull()
    })

    it('shows the centred percentage with showValue', () => {
      const { getByText } = render(
        <Progress shape="circular" value={80} showValue label="Loading" />
      )
      expect(getByText('80%')).not.toBeNull()
    })

    it('is indeterminate (Radix value=null) when indeterminate', () => {
      const { getByRole } = render(<Progress shape="circular" indeterminate label="Loading" />)
      const el = getByRole('progressbar')
      expect(el.getAttribute('aria-valuenow')).toBeNull()
      expect(el.getAttribute('data-indeterminate')).toBe('true')
    })
  })
})
