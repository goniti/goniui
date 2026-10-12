// Tailwind + the goniui theme so components render with the real tokens.
import './preview.css'

import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  // Generate an autodocs page (API table + rendered stories) for every component.
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // axe-core runs on every story; 'error' makes a violation fail the story test.
    a11y: { test: 'error' },
  },
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      const dark = context.globals.theme === 'dark'
      document.documentElement.classList.toggle('dark', dark)
      document.body.style.background = dark ? '#09090b' : '#ffffff'
      return Story()
    },
  ],
}

export default preview
