import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/atoms/Button'
import { Flex } from '@/atoms/layout/Flex'
import { Text } from '@/atoms/Text'

import { Toaster } from './components/Toaster'
import { toast } from './components/ToasterRoot'

const POSITIONS = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const

const meta = {
  title: 'Molecules/Toast',
  component: Toaster,
  // `position: fixed` pins to the iframe viewport, so a full-screen canvas makes
  // the chosen corner unambiguous (a short, centered canvas reads as "middle").
  parameters: { layout: 'fullscreen' },
  // Sonner's `toast()` is a global singleton: every mounted <Toaster> renders the
  // same queue. The autodocs page mounts all stories at once → toasts duplicate
  // across toasters. Disable it; view each story on its own canvas instead.
  tags: ['!autodocs'],
  argTypes: {
    position: { control: 'select', options: POSITIONS },
  },
  args: { position: 'bottom-right' },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

function fakeUpload() {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.4 ? resolve('cover.png') : reject(new Error('413'))), 2000)
  })
}

/** Every tone + a promise toast. Hover a toast to pause its progress bar; click ×
 *  or drag it away to dismiss. Switch the `position` control to move the stack. */
export const Playground: Story = {
  render: (args) => (
    <Flex align="center" justify="center" className="min-h-screen w-full bg-neutral-50 p-8">
      <Flex direction="col" gap="sm" className="w-64">
        <Button
          onClick={() => toast('Changes saved', { description: 'Your profile is up to date.' })}
        >
          Default
        </Button>
        <Button onClick={() => toast.success('Published successfully')}>Success</Button>
        <Button onClick={() => toast.error('Something went wrong')}>Error</Button>
        <Button onClick={() => toast.info('A new version is available')}>Info</Button>
        <Button onClick={() => toast.warning('Session expiring soon')}>Warning</Button>
        <Button
          onClick={() =>
            toast.promise(fakeUpload(), {
              loading: 'Uploading cover…',
              success: (name) => `Uploaded ${name}`,
              error: 'Upload failed — try again',
            })
          }
        >
          Promise
        </Button>
        <Button
          onClick={() =>
            toast('Subject deleted', {
              description: 'This action can be undone.',
              action: { label: 'Undo', onClick: () => toast.success('Restored') },
            })
          }
        >
          With action
        </Button>
      </Flex>
      <Toaster {...args} />
    </Flex>
  ),
}

/** Drives the `position` arg — fire a toast, then switch the control to watch the
 *  stack jump to each of the six corners. */
export const Positions: Story = {
  render: (args) => (
    <Flex
      direction="col"
      align="center"
      justify="center"
      gap="sm"
      className="min-h-screen w-full bg-neutral-50 p-8"
    >
      <Text tone="muted">Anchored {args.position}</Text>
      <Button onClick={() => toast.success(`Anchored ${args.position}`)}>Fire a toast</Button>
      <Toaster {...args} />
    </Flex>
  ),
}
