import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { AssistedPasswordConfirm } from './AssistedPasswordConfirm'
import { passwordMatchStatuses } from './components/PasswordMatchStrip'

const TARGET = 'StrongPass1!'

describe('passwordMatchStatuses', () => {
  it('returns one status per character of the target password', () => {
    expect(passwordMatchStatuses(TARGET, '')).toHaveLength(TARGET.length)
  })

  it('marks untyped positions as empty', () => {
    expect(passwordMatchStatuses(TARGET, '')).toEqual(Array(TARGET.length).fill('empty'))
  })

  it('marks a matching prefix as match and untyped tail as empty', () => {
    const statuses = passwordMatchStatuses(TARGET, 'Strong')
    expect(statuses.slice(0, 6)).toEqual(Array(6).fill('match'))
    expect(statuses.slice(6)).toEqual(Array(TARGET.length - 6).fill('empty'))
  })

  it('marks a diverging character as mismatch', () => {
    const statuses = passwordMatchStatuses(TARGET, 'StronX')
    expect(statuses[5]).toBe('mismatch')
  })
})

describe('AssistedPasswordConfirm', () => {
  const baseProps = { password: TARGET, onValueChange: vi.fn() }

  it('renders one strip cell per target character', () => {
    render(<AssistedPasswordConfirm {...baseProps} value="" />)
    expect(screen.getAllByTestId('apc-cell')).toHaveLength(TARGET.length)
  })

  it('renders no strip when there is no target password', () => {
    render(<AssistedPasswordConfirm {...baseProps} password="" value="" />)
    expect(screen.queryAllByTestId('apc-cell')).toHaveLength(0)
  })

  it('calls onValueChange for a normal keystroke', () => {
    const onValueChange = vi.fn()
    const { container } = render(
      <AssistedPasswordConfirm password={TARGET} value="Stron" onValueChange={onValueChange} />
    )
    const input = container.querySelector('input')!
    fireEvent.change(input, { target: { value: 'Stro' } })
    expect(onValueChange).toHaveBeenCalledWith('Stro')
  })

  it('rejects keystrokes past the target length (no onValueChange)', () => {
    const onValueChange = vi.fn()
    const { container } = render(
      <AssistedPasswordConfirm password={TARGET} value={TARGET} onValueChange={onValueChange} />
    )
    const input = container.querySelector('input')!
    fireEvent.change(input, { target: { value: `${TARGET}x` } })
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('marks every cell as match when the values are equal', () => {
    render(<AssistedPasswordConfirm {...baseProps} value={TARGET} />)
    const matched = screen
      .getAllByTestId('apc-cell')
      .filter((cell) => cell.dataset.status === 'match')
    expect(matched).toHaveLength(TARGET.length)
  })
})
