'use client'

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

export type NavigationMenuItemProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>

/** A single top-level item — pairs a `Trigger` with its `Content` panel. */
export const NavigationMenuItem = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Item>,
  NavigationMenuItemProps
>(function NavigationMenuItem(props, ref) {
  return <NavigationMenuPrimitive.Item ref={ref} {...props} />
})
