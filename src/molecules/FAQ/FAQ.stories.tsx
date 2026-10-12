import type { Meta, StoryObj } from '@storybook/react-vite'

import * as FAQ from './index'

const sampleItems = [
  {
    question: 'How do I create an account?',
    answer:
      'Click Sign up on the login page and follow the steps. You will receive a confirmation email.',
  },
  {
    question: 'Can I change my password?',
    answer: 'Yes — open your profile settings and choose Security to update your password.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'We encrypt data in transit and at rest. Access is protected by industry-standard authentication.',
    defaultOpen: true,
  },
  {
    question: 'How do I contact support?',
    answer: 'Use the Help section in the app or email support@example.com.',
  },
] as const

const meta = {
  title: 'Molecules/FAQ',
  component: FAQ.Root,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FAQ.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <FAQ.Root className="w-full max-w-2xl">
      {sampleItems.map((item) => (
        <FAQ.Item
          key={item.question}
          question={item.question}
          answer={item.answer}
          defaultOpen={'defaultOpen' in item ? item.defaultOpen : false}
        />
      ))}
    </FAQ.Root>
  ),
}

export const SingleItem: Story = {
  render: () => (
    <FAQ.Root className="w-full max-w-xl">
      <FAQ.Item
        question="What is this design system?"
        answer="A token-backed React component library for Tailwind CSS v4 apps."
        defaultOpen
      />
    </FAQ.Root>
  ),
}

/** Open state — question text uses a primary gradient; hover keeps a transparent background. */
export const GradientWhenOpen: Story = {
  render: () => (
    <FAQ.Root className="w-full max-w-xl">
      <FAQ.Item
        question="Why did the chicken cross the road?"
        answer="To get to the other side."
        defaultOpen
      />
    </FAQ.Root>
  ),
}
