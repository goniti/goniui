'use client'

import type { ReactNode } from 'react'

import { Flex } from '@/atoms/layout/Flex'

export interface FormActionsProps {
  children: ReactNode
}

/** Inline row for the controls under the fields (checkbox / forgot-password link). */
export function FormActions({ children }: FormActionsProps) {
  return (
    <Flex align="center" justify="between" className="text-sm">
      {children}
    </Flex>
  )
}
