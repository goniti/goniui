/**
 * Pure CNIL-compliant password rule predicates.
 * Label-free — labels are supplied by the caller (i18n concern, not here).
 */
export const passwordRuleTests = {
  /** Returns a predicate that passes when the value has at least `n` characters. */
  minLength: (n: number) => (v: string) => v.length >= n,
  hasUppercase: (v: string) => /[A-Z]/.test(v),
  hasLowercase: (v: string) => /[a-z]/.test(v),
  hasDigit: (v: string) => /\d/.test(v),
  /** Passes when the value contains at least one character that is not A–Z, a–z, or 0–9. */
  hasSpecial: (v: string) => /[^A-Za-z0-9]/.test(v),
} as const
