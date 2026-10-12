import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { type PasswordRule, PasswordStrengthMeter } from './PasswordStrengthMeter'
import { passwordRuleTests } from './rules'

const RULES: PasswordRule[] = [
  { id: 'length', label: 'At least 12 characters', test: passwordRuleTests.minLength(12) },
  { id: 'upper', label: 'An uppercase letter', test: passwordRuleTests.hasUppercase },
  { id: 'lower', label: 'A lowercase letter', test: passwordRuleTests.hasLowercase },
  { id: 'digit', label: 'A digit', test: passwordRuleTests.hasDigit },
  { id: 'special', label: 'A special character', test: passwordRuleTests.hasSpecial },
]

// 'StrongPass1!' → 12 chars, uppercase, lowercase, digit, special — all 5 rules pass
const STRONG_PASSWORD = 'StrongPass1!'

describe('PasswordStrengthMeter', () => {
  it('renders one bar segment per rule', () => {
    render(<PasswordStrengthMeter value="" rules={RULES} />)
    expect(screen.getAllByTestId('psm-segment')).toHaveLength(RULES.length)
  })

  it('marks zero segments as met when password is empty', () => {
    render(<PasswordStrengthMeter value="" rules={RULES} />)
    const segments = screen.getAllByTestId('psm-segment')
    const metSegments = segments.filter((segment) => segment.dataset.met === 'true')
    expect(metSegments).toHaveLength(0)
  })

  it('marks exactly one segment as met when only hasUppercase passes', () => {
    // "A" satisfies only hasUppercase
    render(<PasswordStrengthMeter value="A" rules={RULES} />)
    const segments = screen.getAllByTestId('psm-segment')
    const metSegments = segments.filter((segment) => segment.dataset.met === 'true')
    expect(metSegments).toHaveLength(1)
  })

  it('marks all segments as met when all rules pass', () => {
    render(<PasswordStrengthMeter value={STRONG_PASSWORD} rules={RULES} />)
    const segments = screen.getAllByTestId('psm-segment')
    const metSegments = segments.filter((segment) => segment.dataset.met === 'true')
    expect(metSegments).toHaveLength(RULES.length)
  })

  it('renders a checklist row for each rule label', () => {
    render(<PasswordStrengthMeter value="" rules={RULES} />)
    for (const rule of RULES) {
      expect(screen.getByText(rule.label as string)).toBeTruthy()
    }
  })

  it('shows unmet status icon for each rule when password is empty', () => {
    render(<PasswordStrengthMeter value="" rules={RULES} />)
    const unmetIcons = screen.getAllByLabelText('unmet')
    expect(unmetIcons).toHaveLength(RULES.length)
  })

  it('shows met status icon for a rule whose predicate passes', () => {
    // "A" satisfies only hasUppercase → 1 met icon
    render(<PasswordStrengthMeter value="A" rules={RULES} />)
    const metIcons = screen.getAllByLabelText('met')
    expect(metIcons).toHaveLength(1)
  })

  it('updates met/unmet state when value changes', () => {
    const { rerender } = render(<PasswordStrengthMeter value="" rules={RULES} />)
    expect(screen.getAllByLabelText('unmet')).toHaveLength(RULES.length)

    rerender(<PasswordStrengthMeter value={STRONG_PASSWORD} rules={RULES} />)
    expect(screen.getAllByLabelText('met')).toHaveLength(RULES.length)
    expect(screen.queryAllByLabelText('unmet')).toHaveLength(0)
  })

  it('wraps the checklist in an aria-live="polite" region', () => {
    const { container } = render(<PasswordStrengthMeter value="" rules={RULES} />)
    const liveRegion = container.querySelector('[aria-live="polite"]')
    expect(liveRegion).not.toBeNull()
  })
})
