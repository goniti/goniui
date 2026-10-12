import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Countdown } from '../components/Countdown'

// ─── Initial render ───────────────────────────────────────────────────────────

// Freeze Date.now() so timing-sensitive assertions are deterministic even on
// slow CI machines (the effect's immediate setTick call uses Date.now()).
describe('Countdown — initial render', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('displays each unit when given seconds', () => {
    render(
      <Countdown
        target={3661}
        format={['hours', 'minutes', 'seconds']}
        labels={{ hours: 'h', minutes: 'm', seconds: 's' }}
      />
    )
    // 3661 s = 1 h, 1 m, 1 s — all three units display "01"
    expect(screen.getAllByText('01')).toHaveLength(3)
    expect(screen.getByText('h')).toBeTruthy()
    expect(screen.getByText('m')).toBeTruthy()
    expect(screen.getByText('s')).toBeTruthy()
  })

  it('renders all four units by default', () => {
    render(
      <Countdown target={90061} labels={{ days: 'd', hours: 'h', minutes: 'm', seconds: 's' }} />
    )
    // 90061 s = 1 d, 1 h, 1 m, 1 s
    expect(screen.getByText('d')).toBeTruthy()
    expect(screen.getByText('h')).toBeTruthy()
    expect(screen.getByText('m')).toBeTruthy()
    expect(screen.getByText('s')).toBeTruthy()
  })

  it('pads single-digit values with a leading zero', () => {
    render(<Countdown target={5} format={['seconds']} labels={{ seconds: 'sec' }} />)
    expect(screen.getByText('05')).toBeTruthy()
  })

  it('carries aria-live="polite" on the root', () => {
    const { container } = render(<Countdown target={10} />)
    expect(container.firstElementChild?.getAttribute('aria-live')).toBe('polite')
  })
})

// ─── Timer ticking ─────────────────────────────────────────────────────────

describe('Countdown — ticking', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('decrements by 1 after each second', () => {
    render(<Countdown target={10} format={['seconds']} labels={{ seconds: 'sec' }} />)
    expect(screen.getByText('10')).toBeTruthy()

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByText('09')).toBeTruthy()

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByText('08')).toBeTruthy()
  })

  it('shows the expired slot once the timer reaches zero', () => {
    render(
      <Countdown
        target={2}
        format={['seconds']}
        labels={{ seconds: 'sec' }}
        expiredSlot={<span>Done!</span>}
      />
    )
    expect(screen.getByText('02')).toBeTruthy()

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(screen.queryByText('02')).toBeNull()
    expect(screen.getByText('Done!')).toBeTruthy()
  })

  it('shows the default expired message when expiredSlot is omitted', () => {
    render(
      <Countdown
        target={1}
        format={['seconds']}
        labels={{ seconds: 'sec', expired: 'Time is up' }}
      />
    )

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByText('Time is up')).toBeTruthy()
  })

  it('clears the interval after expiry (no further state updates)', () => {
    const { container } = render(
      <Countdown target={1} format={['seconds']} labels={{ seconds: 'sec', expired: 'Finished' }} />
    )

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    const htmlAfterExpiry = container.innerHTML

    // Advance well past expiry — HTML should not change.
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(container.innerHTML).toBe(htmlAfterExpiry)
  })
})

// ─── Format prop ──────────────────────────────────────────────────────────────

describe('Countdown — format prop', () => {
  it('renders only the requested units', () => {
    vi.useFakeTimers()
    render(
      <Countdown
        target={3600}
        format={['minutes', 'seconds']}
        labels={{ days: 'd', hours: 'h', minutes: 'm', seconds: 's' }}
      />
    )
    expect(screen.queryByText('d')).toBeNull()
    expect(screen.queryByText('h')).toBeNull()
    expect(screen.getByText('m')).toBeTruthy()
    expect(screen.getByText('s')).toBeTruthy()
    vi.useRealTimers()
  })
})

// ─── target as Date ──────────────────────────────────────────────────────────

describe('Countdown — target as Date', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('counts down toward a future Date', () => {
    const futureDate = new Date(Date.now() + 5000)

    render(<Countdown target={futureDate} format={['seconds']} labels={{ seconds: 'sec' }} />)
    expect(screen.getByText('05')).toBeTruthy()

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByText('04')).toBeTruthy()
  })

  it('immediately shows expired when target Date is in the past', () => {
    const pastDate = new Date(Date.now() - 1000)
    render(
      <Countdown
        target={pastDate}
        labels={{ expired: 'Already over' }}
        expiredSlot={<span>Already over</span>}
      />
    )
    expect(screen.getByText('Already over')).toBeTruthy()
  })
})

// ─── A11y wiring ─────────────────────────────────────────────────────────────

describe('Countdown — a11y', () => {
  it('sets aria-atomic on the live region', () => {
    vi.useFakeTimers()
    const { container } = render(<Countdown target={60} />)
    expect(container.firstElementChild?.getAttribute('aria-atomic')).toBe('true')
    vi.useRealTimers()
  })

  it('sets role="status" on the expired state', () => {
    vi.useFakeTimers()
    const { container } = render(<Countdown target={0} labels={{ expired: 'Expired' }} />)
    expect(container.firstElementChild?.getAttribute('role')).toBe('status')
    vi.useRealTimers()
  })
})
