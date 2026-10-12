import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Embla needs real layout (jsdom has none), so mock the engine: a controllable
// fake API drives the snap state the component renders from. Real drag/scroll/
// snap behaviour is covered by the Storybook browser tests.
const { emblaApi, emblaRef, setSelected, resetEmbla } = vi.hoisted(() => {
  let selected = 0
  const listeners: Record<string, (api: unknown) => void> = {}
  const api = {
    scrollSnapList: () => [0, 0.25, 0.5, 0.75],
    selectedScrollSnap: () => selected,
    canScrollPrev: () => selected > 0,
    canScrollNext: () => selected < 3,
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    scrollTo: vi.fn(),
    on: (event: string, callback: (api: unknown) => void) => {
      listeners[event] = callback
      return api
    },
    off: () => api,
  }
  return {
    emblaApi: api,
    emblaRef: vi.fn(),
    setSelected: (index: number) => {
      selected = index
      listeners.select?.(api)
    },
    resetEmbla: () => {
      selected = 0
    },
  }
})

vi.mock('embla-carousel-react', () => ({ default: () => [emblaRef, emblaApi] }))
vi.mock('embla-carousel-wheel-gestures', () => ({ WheelGesturesPlugin: () => ({}) }))
vi.mock('embla-carousel-autoplay', () => ({ default: () => ({}) }))

import * as Carousel from '../index'

beforeEach(() => {
  resetEmbla()
  vi.clearAllMocks()
})

function renderCarousel(props?: Partial<React.ComponentProps<typeof Carousel.Root>>) {
  return render(
    <Carousel.Root aria-label="Test carousel" {...props}>
      <Carousel.Viewport data-testid="viewport">
        <Carousel.Item aria-label="Slide 1 of 4">First</Carousel.Item>
        <Carousel.Item aria-label="Slide 2 of 4">Second</Carousel.Item>
        <Carousel.Item aria-label="Slide 3 of 4">Third</Carousel.Item>
        <Carousel.Item aria-label="Slide 4 of 4">Fourth</Carousel.Item>
      </Carousel.Viewport>
      <Carousel.Previous aria-label="Previous slide" />
      <Carousel.Next aria-label="Next slide" />
    </Carousel.Root>
  )
}

describe('Carousel', () => {
  describe('structure & a11y', () => {
    it('is a region landmark with carousel role description and an accessible name', () => {
      renderCarousel()
      const region = screen.getByRole('region', { name: 'Test carousel' })
      expect(region.getAttribute('aria-roledescription')).toBe('carousel')
    })

    it('renders slides as groups with slide role description and labels', () => {
      renderCarousel()
      const slides = screen.getAllByRole('group')
      expect(slides).toHaveLength(4)
      expect(screen.getByRole('group', { name: 'Slide 1 of 4' })).toBeTruthy()
      expect(screen.getByText('First')).toBeTruthy()
    })
  })

  describe('Previous / Next', () => {
    it('routes nav through the Button atom with edge positioning', () => {
      renderCarousel()
      const prev = screen.getByRole('button', { name: 'Previous slide' })
      const next = screen.getByRole('button', { name: 'Next slide' })
      expect(prev.className).toContain('disabled:pointer-events-none') // Button atom base
      expect(prev.className).toContain('rounded-full')
      expect(prev.className).toContain('left-2')
      expect(next.className).toContain('right-2')
    })

    it('drives the engine on click', () => {
      renderCarousel()
      fireEvent.click(screen.getByRole('button', { name: 'Next slide' }))
      expect(emblaApi.scrollNext).toHaveBeenCalled()
    })

    it('solid variant renders a filled pill; ghost (default) does not', () => {
      render(
        <Carousel.Root aria-label="Variant carousel">
          <Carousel.Viewport>
            <Carousel.Item aria-label="Slide 1 of 4">A</Carousel.Item>
          </Carousel.Viewport>
          <Carousel.Previous aria-label="Previous slide" variant="solid" />
          <Carousel.Next aria-label="Next slide" />
        </Carousel.Root>
      )
      expect(screen.getByRole('button', { name: 'Previous slide' }).className).toContain(
        'bg-surface'
      )
      expect(screen.getByRole('button', { name: 'Next slide' }).className).not.toContain(
        'bg-surface'
      )
    })

    it('disables Previous at the start and enables it after a select', () => {
      renderCarousel()
      expect(screen.getByRole('button', { name: 'Previous slide' })).toHaveProperty(
        'disabled',
        true
      )
      act(() => setSelected(2))
      expect(screen.getByRole('button', { name: 'Previous slide' })).toHaveProperty(
        'disabled',
        false
      )
    })
  })

  describe('Keyboard navigation', () => {
    it('ArrowRight scrolls next, ArrowLeft scrolls prev (horizontal)', () => {
      renderCarousel()
      const region = screen.getByRole('region')
      fireEvent.keyDown(region, { key: 'ArrowRight' })
      expect(emblaApi.scrollNext).toHaveBeenCalled()
      fireEvent.keyDown(region, { key: 'ArrowLeft' })
      expect(emblaApi.scrollPrev).toHaveBeenCalled()
    })

    it('uses the vertical keys when orientation is vertical', () => {
      renderCarousel({ orientation: 'vertical' })
      fireEvent.keyDown(screen.getByRole('region'), { key: 'ArrowDown' })
      expect(emblaApi.scrollNext).toHaveBeenCalled()
    })
  })

  describe('Dots', () => {
    it('renders one dot per snap, marks the active, and scrolls on click', () => {
      render(
        <Carousel.Root aria-label="Dotted">
          <Carousel.Viewport>
            <Carousel.Item aria-label="Slide 1 of 4">A</Carousel.Item>
          </Carousel.Viewport>
          <Carousel.Dots />
        </Carousel.Root>
      )
      const dots = screen.getAllByRole('button', { name: /Go to slide/ })
      expect(dots).toHaveLength(4)
      expect(dots[0].getAttribute('aria-current')).toBe('true')

      fireEvent.click(dots[2])
      expect(emblaApi.scrollTo).toHaveBeenCalledWith(2)

      act(() => setSelected(2))
      expect(
        screen.getAllByRole('button', { name: /Go to slide/ })[2].getAttribute('aria-current')
      ).toBe('true')
    })
  })

  describe('Morph', () => {
    it('elongates the active segment into a pill and scrolls on click', () => {
      render(
        <Carousel.Root aria-label="Morphed">
          <Carousel.Viewport>
            <Carousel.Item aria-label="Slide 1 of 4">A</Carousel.Item>
          </Carousel.Viewport>
          <Carousel.Morph />
        </Carousel.Root>
      )
      const segments = screen.getAllByRole('button', { name: /Go to slide/ })
      expect(segments).toHaveLength(4)
      expect(segments[0].className).toContain('w-6') // active pill
      expect(segments[1].className).toContain('w-2') // inactive dot

      fireEvent.click(segments[3])
      expect(emblaApi.scrollTo).toHaveBeenCalledWith(3)
    })
  })

  describe('useCarousel hook', () => {
    it('throws when used outside Carousel.Root', () => {
      const ThrowingComponent = () => {
        Carousel.useCarousel()
        return null
      }
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
      expect(() => render(<ThrowingComponent />)).toThrow(
        'useCarousel must be used within Carousel.Root'
      )
      consoleError.mockRestore()
    })
  })
})
