import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { Box } from '@/atoms/layout/Box'

import * as Carousel from './index'

const slides = [
  { id: '1', bg: 'bg-primary-100', label: 'Slide 1 — Introduction' },
  { id: '2', bg: 'bg-primary-200', label: 'Slide 2 — Features' },
  { id: '3', bg: 'bg-primary-300', label: 'Slide 3 — Pricing' },
  { id: '4', bg: 'bg-neutral-100', label: 'Slide 4 — Get started' },
]

const manySlides = Array.from({ length: 12 }, (_, index) => ({
  id: String(index + 1),
  bg: index % 2 === 0 ? 'bg-primary-100' : 'bg-primary-200',
  label: `Slide ${index + 1}`,
}))

const meta = {
  title: 'Molecules/Carousel',
  component: Carousel.Root,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Carousel.Root>

export default meta
type Story = StoryObj<typeof meta>

function Slide({
  bg,
  label,
  className = 'h-48',
}: {
  bg: string
  label: string
  className?: string
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg text-lg font-medium text-neutral-800 ${className} ${bg}`}
    >
      {label}
    </div>
  )
}

/** Default horizontal carousel with Previous / Next nav buttons. Drag/swipe on touch + trackpad. */
export const Default: Story = {
  render: () => (
    <Carousel.Root aria-label="Feature highlights" className="w-full max-w-xl">
      <Carousel.Viewport>
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.id} aria-label={`Slide ${index + 1} of ${slides.length}`}>
            <Slide bg={slide.bg} label={slide.label} />
          </Carousel.Item>
        ))}
      </Carousel.Viewport>
      <Carousel.Previous aria-label="Previous slide" />
      <Carousel.Next aria-label="Next slide" />
    </Carousel.Root>
  ),
  // Guards arrow symmetry: the gap from each arrow to its carousel edge is equal.
  play: async ({ canvas, canvasElement }) => {
    const region = canvasElement.querySelector('[role="region"]')!.getBoundingClientRect()
    const prev = canvas.getByRole('button', { name: 'Previous slide' }).getBoundingClientRect()
    const next = canvas.getByRole('button', { name: 'Next slide' }).getBoundingClientRect()
    await expect(Math.abs(prev.left - region.left - (region.right - next.right))).toBeLessThan(1)
  },
}

/**
 * Centred "peek" slider (e.g. an ad carousel): one slide centred with the
 * previous/next peeking on the sides, snapping back to centre. `loop` makes the
 * ends wrap (slide 4 ↔ slide 1) instead of leaving a half-empty rail, and
 * `autoplay` advances it on its own (pausing on interaction). Arrows use the
 * `solid` variant so they read over the peeking slides.
 */
export const CenteredPeek: Story = {
  render: () => (
    <Carousel.Root
      loop
      autoplay
      opts={{ align: 'center' }}
      aria-label="Ad slider"
      className="w-full max-w-2xl"
    >
      <Carousel.Viewport>
        {slides.map((slide, index) => (
          <Carousel.Item
            key={slide.id}
            aria-label={`Slide ${index + 1} of ${slides.length}`}
            className="basis-4/5"
          >
            <Slide bg={slide.bg} label={slide.label} className="h-40 text-base" />
          </Carousel.Item>
        ))}
      </Carousel.Viewport>
      <Carousel.Previous variant="solid" aria-label="Previous slide" />
      <Carousel.Next variant="solid" aria-label="Next slide" />
      <Carousel.Dots className="absolute inset-x-0 bottom-3" />
    </Carousel.Root>
  ),
}

/**
 * Paginate two-by-two: two slides per view, `slidesToScroll: 2` snaps from
 * [1, 2] to [3, 4]. The dots reflect the two pages (not four slides). No loop
 * needed — it advances a page at a time.
 *
 * Outer pagination: the dots sit *below* the slides. Wrapping the slides + arrows
 * in a relative box keeps the arrows centred on the slides, with the dots as a
 * sibling underneath.
 */
export const GroupOfTwo: Story = {
  render: () => (
    <Carousel.Root
      opts={{ slidesToScroll: 2 }}
      aria-label="Two-by-two carousel"
      className="w-full max-w-2xl"
    >
      <Box className="relative">
        <Carousel.Viewport>
          {slides.map((slide, index) => (
            <Carousel.Item
              key={slide.id}
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              className="basis-1/2"
            >
              <Slide bg={slide.bg} label={slide.label} className="h-40 text-base" />
            </Carousel.Item>
          ))}
        </Carousel.Viewport>
        <Carousel.Previous aria-label="Previous slide" />
        <Carousel.Next aria-label="Next slide" />
      </Box>
      <Carousel.Dots className="mt-2" />
    </Carousel.Root>
  ),
  // Guards the reset layering: a margin utility (mt-*) must actually apply.
  // Before the reset moved into @layer base, `* { margin: 0 }` beat it (stuck 0px).
  play: async ({ canvas }) => {
    const dots = canvas.getByRole('group', { name: 'Slides' })
    await waitFor(() => expect(getComputedStyle(dots).marginTop).not.toBe('0px'))
  },
}

/** Dot pagination (composition: render `Carousel.Dots` instead of / alongside arrows). */
export const WithDots: Story = {
  render: () => (
    <Carousel.Root aria-label="Carousel with dots" className="flex w-full max-w-xl flex-col gap-3">
      <Carousel.Viewport>
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.id} aria-label={`Slide ${index + 1} of ${slides.length}`}>
            <Slide bg={slide.bg} label={slide.label} />
          </Carousel.Item>
        ))}
      </Carousel.Viewport>
      <Carousel.Dots className="self-center" />
    </Carousel.Root>
  ),
  // Proves Embla initialised in the real browser and produced one snap per slide
  // (the unit test only asserts this against a mock).
  play: async ({ canvas }) => {
    await waitFor(async () =>
      expect(await canvas.findAllByRole('button', { name: /Go to slide/ })).toHaveLength(
        slides.length
      )
    )
  },
}

/** Instagram-style dynamic bullets — many slides, edge dots shrink, loop enabled. */
export const DynamicDots: Story = {
  render: () => (
    <Carousel.Root
      loop
      aria-label="Carousel with dynamic dots"
      className="flex w-full max-w-md flex-col gap-3"
    >
      <Carousel.Viewport>
        {manySlides.map((slide, index) => (
          <Carousel.Item key={slide.id} aria-label={`Slide ${index + 1} of ${manySlides.length}`}>
            <Slide bg={slide.bg} label={slide.label} className="h-44" />
          </Carousel.Item>
        ))}
      </Carousel.Viewport>
      <Carousel.Dots className="self-center" />
    </Carousel.Root>
  ),
  // Guards the dots against the flex-compression regression: the active dot must
  // stay round (equal width/height), not squashed into an oval. The button is a
  // 44px-tall touch target; the visible dot is its inner span.
  play: async ({ canvasElement }) => {
    const activeDot = await waitFor(() => {
      const dot = canvasElement.querySelector('[aria-current="true"] > span')
      if (!dot) throw new Error('active dot not found')
      return dot as HTMLElement
    })
    const { width, height } = getComputedStyle(activeDot)
    await expect(width).toBe(height)
  },
}

/** Morphing indicator — the active segment elongates into a pill. */
export const WithMorph: Story = {
  render: () => (
    <Carousel.Root
      aria-label="Carousel with morph indicator"
      className="flex w-full max-w-xl flex-col gap-3"
    >
      <Carousel.Viewport>
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.id} aria-label={`Slide ${index + 1} of ${slides.length}`}>
            <Slide bg={slide.bg} label={slide.label} />
          </Carousel.Item>
        ))}
      </Carousel.Viewport>
      <Carousel.Morph className="self-center" />
    </Carousel.Root>
  ),
}

/** Infinite loop — wraps around at the edges; arrows never disable. */
export const Loop: Story = {
  render: () => (
    <Carousel.Root loop aria-label="Looping carousel" className="w-full max-w-xl">
      <Carousel.Viewport>
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.id} aria-label={`Slide ${index + 1} of ${slides.length}`}>
            <Slide bg={slide.bg} label={slide.label} />
          </Carousel.Item>
        ))}
      </Carousel.Viewport>
      <Carousel.Previous aria-label="Previous slide" />
      <Carousel.Next aria-label="Next slide" />
    </Carousel.Root>
  ),
}

/** Single slide, no nav — minimal composition. */
export const NoControls: Story = {
  render: () => (
    <Carousel.Root aria-label="Auto-advancing banner" className="w-full max-w-lg">
      <Carousel.Viewport>
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.id} aria-label={`Slide ${index + 1} of ${slides.length}`}>
            <Slide bg={slide.bg} label={slide.label} className="h-40" />
          </Carousel.Item>
        ))}
      </Carousel.Viewport>
    </Carousel.Root>
  ),
}

/** Vertical orientation — height on the viewport, arrows rotated to the cross axis. */
export const Vertical: Story = {
  render: () => (
    <Carousel.Root
      orientation="vertical"
      aria-label="Vertical feature showcase"
      className="w-full max-w-sm"
    >
      <Carousel.Viewport className="h-48">
        {slides.map((slide, index) => (
          <Carousel.Item
            key={slide.id}
            aria-label={`Slide ${index + 1} of ${slides.length}`}
            className="h-48"
          >
            <Slide bg={slide.bg} label={slide.label} className="h-full" />
          </Carousel.Item>
        ))}
      </Carousel.Viewport>
      <Carousel.Previous
        aria-label="Previous slide"
        className="left-1/2 top-2 -translate-x-1/2 translate-y-0 rotate-90"
      />
      <Carousel.Next
        aria-label="Next slide"
        className="bottom-2 left-1/2 top-auto -translate-x-1/2 translate-y-0 rotate-90"
      />
    </Carousel.Root>
  ),
}
