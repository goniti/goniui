import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/atoms/Button'
import { Flex } from '@/atoms/layout/Flex'

import { Card } from './Card'

const meta = {
  title: 'Atoms/Card',
  component: Card,
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Shows the compound API + the declarative "reads like the screen" composition.
export const WithHeaderAndActions: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Header>
        <h3 className="font-semibold text-neutral-900">My board</h3>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-neutral-600">Contenu de la carte.</p>
      </Card.Body>
      <Card.Footer>
        <Flex justify="end" gap="sm">
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">Add to board</Button>
        </Flex>
      </Card.Footer>
    </Card>
  ),
}

export const BodyOnly: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Body>A minimal card, just a body.</Card.Body>
    </Card>
  ),
}

export const AuthVariant: Story = {
  render: () => (
    <Card variant="auth" className="w-80">
      <p className="text-sm text-neutral-600">
        Content of a sign-in form — padding and shadow included.
      </p>
    </Card>
  ),
}
