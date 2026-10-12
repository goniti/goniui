import { act, fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { AgendaPicker } from '../components/AgendaPicker'

// jsdom doesn't implement pointer capture — make it a no-op for drag tests.
beforeAll(() => {
  Element.prototype.setPointerCapture = () => {}
  Element.prototype.releasePointerCapture = () => {}
})

const years = Array.from({ length: 101 }, (_, index) => {
  const year = 1926 + index
  return { value: String(year), label: String(year) }
})

describe('AgendaPicker UX regression', () => {
  it('does not emit a value change on mount while aligning scroll', () => {
    const onValueChange = vi.fn()
    render(
      <AgendaPicker ariaLabel="year" items={years} value="2026" onValueChange={onValueChange} />
    )

    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('confirms when the center selection band is clicked', () => {
    const onConfirm = vi.fn()
    render(
      <AgendaPicker
        ariaLabel="day"
        confirmLabel="OK"
        items={[
          { value: '01', label: '01' },
          { value: '02', label: '02' },
        ]}
        value="01"
        onValueChange={vi.fn()}
        onConfirm={onConfirm}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'OK' }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('exposes a vertical resize cursor on the scroll thumb', () => {
    render(
      <AgendaPicker
        ariaLabel="day"
        items={[
          { value: '01', label: '01' },
          { value: '02', label: '02' },
          { value: '03', label: '03' },
        ]}
        value="02"
        onValueChange={vi.fn()}
      />
    )

    const thumb = document.querySelector('.cursor-ns-resize')
    expect(thumb).toBeTruthy()
  })

  it('updates value after the user scrolls the column', async () => {
    const onValueChange = vi.fn()
    render(
      <AgendaPicker
        ariaLabel="day"
        items={[
          { value: '01', label: '01' },
          { value: '02', label: '02' },
          { value: '03', label: '03' },
        ]}
        value="02"
        onValueChange={onValueChange}
      />
    )

    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve))
    })

    const list = document.querySelector('ul') as HTMLUListElement
    fireEvent.wheel(list, { deltaY: 120 })
    expect(onValueChange).toHaveBeenCalledWith('03')
  })

  it('keeps updating the value across a multi-step pointer drag (highlight follows)', async () => {
    const items = Array.from({ length: 6 }, (_, index) => {
      const value = String(index + 1).padStart(2, '0')
      return { value, label: value }
    })

    function Controlled() {
      const [value, setValue] = useState('02')
      return <AgendaPicker ariaLabel="day" items={items} value={value} onValueChange={setValue} />
    }

    const flushFrame = () =>
      act(async () => {
        await new Promise((resolve) => requestAnimationFrame(resolve))
      })

    const { container } = render(<Controlled />)
    await flushFrame()

    const dragSurface = container.querySelector('ul')!.parentElement!
    fireEvent.pointerDown(dragSurface, { button: 0, pointerId: 1, clientY: 100 })

    // First step crosses one item (02 -> 03).
    fireEvent.pointerMove(dragSurface, { pointerId: 1, clientY: 64 })
    await flushFrame()
    // Second step must keep advancing (03 -> 04). Without re-arming the
    // interaction flag the highlight would freeze on 03 here.
    fireEvent.pointerMove(dragSurface, { pointerId: 1, clientY: 28 })
    await flushFrame()
    fireEvent.pointerUp(dragSurface, { pointerId: 1, clientY: 28 })

    const highlighted = Array.from(container.querySelectorAll('li')).filter((li) =>
      li.className.includes('text-primary-700')
    )
    expect(highlighted).toHaveLength(1)
    expect(highlighted[0].textContent).toBe('04')
  })
})
