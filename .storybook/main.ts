import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'

const srcDir = fileURLToPath(new URL('../src', import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  framework: { name: '@storybook/react-vite', options: {} },
  addons: ['@storybook/addon-vitest', '@storybook/addon-a11y', '@storybook/addon-docs'],
  // Tailwind v4 via its Vite plugin so utility classes resolve in stories.
  viteFinal: async (cfg) => {
    cfg.plugins = cfg.plugins ?? []
    cfg.plugins.push(tailwindcss())

    // Mirror the tsconfig `@/*` → src alias so stories resolve it too.
    cfg.resolve = { ...cfg.resolve, alias: { ...cfg.resolve?.alias, '@': srcDir } }

    return cfg
  },
}

export default config
