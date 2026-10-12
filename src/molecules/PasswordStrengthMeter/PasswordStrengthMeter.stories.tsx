import type { Meta, StoryObj } from '@storybook/react-vite'

import { type PasswordRule, PasswordStrengthMeter } from './PasswordStrengthMeter'
import { passwordRuleTests } from './rules'

const CNIL_RULES: PasswordRule[] = [
  { id: 'length', label: 'At least 12 characters', test: passwordRuleTests.minLength(12) },
  { id: 'upper', label: 'An uppercase letter', test: passwordRuleTests.hasUppercase },
  { id: 'lower', label: 'A lowercase letter', test: passwordRuleTests.hasLowercase },
  { id: 'digit', label: 'A digit', test: passwordRuleTests.hasDigit },
  { id: 'special', label: 'A special character', test: passwordRuleTests.hasSpecial },
]

const meta = {
  title: 'Molecules/PasswordStrengthMeter',
  component: PasswordStrengthMeter,
  args: { rules: CNIL_RULES },
} satisfies Meta<typeof PasswordStrengthMeter>

export default meta
type Story = StoryObj<typeof meta>

/** No password entered yet — all rules unmet. */
export const Empty: Story = {
  args: { value: '' },
}

/** Weak password — only a few rules satisfied. */
export const Weak: Story = {
  args: { value: 'password' },
}

/** Partially strong — uppercase + lowercase + digit, but no special char and too short. */
export const Partial: Story = {
  args: { value: 'MyPass1' },
}

/** All CNIL criteria satisfied. */
export const Strong: Story = {
  args: { value: 'StrongPass1!' },
}
