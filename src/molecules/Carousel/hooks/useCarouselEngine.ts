'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { useCallback, useEffect, useMemo, useState } from 'react'

import type { CarouselContextValue, CarouselOrientation } from '../CarouselContext'

/** Embla's option bag and live API, derived from the hook so we don't depend on the core package. */
export type CarouselOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>
/** `true` for sensible defaults, or Embla Autoplay options (`{ delay, stopOnInteraction… }`). */
export type CarouselAutoplay = boolean | NonNullable<Parameters<typeof Autoplay>[0]>
type EmblaPlugins = NonNullable<Parameters<typeof useEmblaCarousel>[1]>
type EmblaApi = NonNullable<UseEmblaCarouselType[1]>

export type CarouselEngine = Omit<CarouselContextValue, 'orientation'>

/**
 * Wraps Embla as the Carousel's scroll engine: pointer + touch drag, momentum,
 * optional loop and RTL come from Embla; the wheel-gestures plugin adds Mac
 * trackpad / mouse-wheel swiping along the scroll axis. Exposes the snap state
 * the indicators (Dots, Morph) and arrows render from.
 */
export function useCarouselEngine(
  orientation: CarouselOrientation,
  opts?: CarouselOptions,
  autoplay?: CarouselAutoplay
): CarouselEngine {
  const axis = orientation === 'vertical' ? 'y' : 'x'
  const plugins = useMemo<EmblaPlugins>(() => {
    const list: EmblaPlugins = [WheelGesturesPlugin({ forceWheelAxis: axis })]
    if (autoplay) list.push(Autoplay(autoplay === true ? {} : autoplay))
    return list
  }, [axis, autoplay])
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis, ...opts }, plugins)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback((api: EmblaApi) => {
    setSelectedIndex(api.selectedScrollSnap())
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const onReInit = useCallback(
    (api: EmblaApi) => {
      setScrollSnaps(api.scrollSnapList())
      onSelect(api)
    },
    [onSelect]
  )

  useEffect(() => {
    if (!emblaApi) return
    onReInit(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onReInit)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onReInit)
    }
  }, [emblaApi, onSelect, onReInit])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  return {
    emblaRef,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    selectedIndex,
    scrollSnaps,
    scrollTo,
  }
}
