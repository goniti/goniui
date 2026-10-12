import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useKeySequence } from '../hooks/useKeySequence'

function press(key: string, target: EventTarget = window) {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
}

afterEach(() => {
  vi.useRealTimers()
})

describe('useKeySequence', () => {
  it('fires onMatch when the ordered sequence is typed', () => {
    const onMatch = vi.fn()
    renderHook(() => useKeySequence(['g', 'b'], onMatch))
    act(() => {
      press('g')
      press('b')
    })
    expect(onMatch).toHaveBeenCalledTimes(1)
  })

  it('does not fire on a wrong sequence', () => {
    const onMatch = vi.fn()
    renderHook(() => useKeySequence(['g', 'b'], onMatch))
    act(() => {
      press('g')
      press('x')
    })
    expect(onMatch).not.toHaveBeenCalled()
  })

  it('ignores keys typed inside an editable element', () => {
    const onMatch = vi.fn()
    const input = document.createElement('input')
    document.body.appendChild(input)
    renderHook(() => useKeySequence(['g', 'b'], onMatch))
    act(() => {
      press('g', input)
      press('b', input)
    })
    expect(onMatch).not.toHaveBeenCalled()
    input.remove()
  })

  it('ignores keys typed inside an open dialog', () => {
    const onMatch = vi.fn()
    const dialog = document.createElement('div')
    dialog.setAttribute('role', 'dialog')
    const fieldInDialog = document.createElement('div')
    dialog.appendChild(fieldInDialog)
    document.body.appendChild(dialog)
    renderHook(() => useKeySequence(['g', 'b'], onMatch))
    act(() => {
      press('g', fieldInDialog)
      press('b', fieldInDialog)
    })
    expect(onMatch).not.toHaveBeenCalled()
    dialog.remove()
  })

  it('ignores keys typed inside an open alertdialog', () => {
    const onMatch = vi.fn()
    const alertDialog = document.createElement('div')
    alertDialog.setAttribute('role', 'alertdialog')
    document.body.appendChild(alertDialog)
    renderHook(() => useKeySequence(['g', 'b'], onMatch))
    act(() => {
      press('g', alertDialog)
      press('b', alertDialog)
    })
    expect(onMatch).not.toHaveBeenCalled()
    alertDialog.remove()
  })

  it('ignores modifier-key combos', () => {
    const onMatch = vi.fn()
    renderHook(() => useKeySequence(['g', 'b'], onMatch))
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g', metaKey: true }))
      press('b')
    })
    expect(onMatch).not.toHaveBeenCalled()
  })

  it('resets a partial sequence after the idle timeout', () => {
    vi.useFakeTimers()
    const onMatch = vi.fn()
    renderHook(() => useKeySequence(['g', 'b'], onMatch, { resetMs: 500 }))
    act(() => press('g'))
    act(() => vi.advanceTimersByTime(600))
    act(() => press('b'))
    expect(onMatch).not.toHaveBeenCalled()
  })
})
