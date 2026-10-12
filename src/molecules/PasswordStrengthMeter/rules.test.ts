import { describe, expect, it } from 'vitest'

import { passwordRuleTests } from './rules'

describe('passwordRuleTests.minLength', () => {
  const min12 = passwordRuleTests.minLength(12)

  it('returns false for an empty string', () => {
    expect(min12('')).toBe(false)
  })

  it('returns false when the string is shorter than the required length', () => {
    expect(min12('Short1!Ab')).toBe(false)
  })

  it('returns false when the string is exactly one character short', () => {
    expect(min12('Abcdefghijk')).toBe(false) // 11 chars
  })

  it('returns true when the string meets the minimum length exactly', () => {
    expect(min12('Abcdefghijkl')).toBe(true) // 12 chars
  })

  it('returns true when the string exceeds the minimum length', () => {
    expect(min12('Abcdefghijklmnop')).toBe(true)
  })
})

describe('passwordRuleTests.hasUppercase', () => {
  it('returns false for an empty string', () => {
    expect(passwordRuleTests.hasUppercase('')).toBe(false)
  })

  it('returns false when there are no uppercase letters', () => {
    expect(passwordRuleTests.hasUppercase('abcdef123!@#')).toBe(false)
  })

  it('returns true when there is at least one uppercase letter', () => {
    expect(passwordRuleTests.hasUppercase('Abcdef123!@#')).toBe(true)
  })

  it('returns true for a string of only uppercase letters', () => {
    expect(passwordRuleTests.hasUppercase('ABCDEF')).toBe(true)
  })
})

describe('passwordRuleTests.hasLowercase', () => {
  it('returns false for an empty string', () => {
    expect(passwordRuleTests.hasLowercase('')).toBe(false)
  })

  it('returns false when there are no lowercase letters', () => {
    expect(passwordRuleTests.hasLowercase('ABCDEF123!@#')).toBe(false)
  })

  it('returns true when there is at least one lowercase letter', () => {
    expect(passwordRuleTests.hasLowercase('ABCDEf123!@#')).toBe(true)
  })

  it('returns true for a string of only lowercase letters', () => {
    expect(passwordRuleTests.hasLowercase('abcdef')).toBe(true)
  })
})

describe('passwordRuleTests.hasDigit', () => {
  it('returns false for an empty string', () => {
    expect(passwordRuleTests.hasDigit('')).toBe(false)
  })

  it('returns false when there are no digits', () => {
    expect(passwordRuleTests.hasDigit('ABCDefgh!@#')).toBe(false)
  })

  it('returns true when there is at least one digit', () => {
    expect(passwordRuleTests.hasDigit('ABCDefgh1!@#')).toBe(true)
  })

  it('returns true for a string of only digits', () => {
    expect(passwordRuleTests.hasDigit('123456')).toBe(true)
  })
})

describe('passwordRuleTests.hasSpecial', () => {
  it('returns false for an empty string', () => {
    expect(passwordRuleTests.hasSpecial('')).toBe(false)
  })

  it('returns false when there are only letters and digits', () => {
    expect(passwordRuleTests.hasSpecial('ABCDefgh1234')).toBe(false)
  })

  it('returns true when there is at least one special character', () => {
    expect(passwordRuleTests.hasSpecial('ABCDefgh1234!')).toBe(true)
  })

  it('returns true for various special characters', () => {
    expect(passwordRuleTests.hasSpecial('ABCDefgh1234@')).toBe(true)
    expect(passwordRuleTests.hasSpecial('ABCDefgh1234#')).toBe(true)
    expect(passwordRuleTests.hasSpecial('ABCDefgh1234 ')).toBe(true) // space is non-alphanumeric
  })

  it('returns false for alphanumeric-only strings regardless of length', () => {
    expect(passwordRuleTests.hasSpecial('ABCDefghijkl1234')).toBe(false)
  })
})
