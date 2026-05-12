import type { StorybookConfig } from '@storybook/react-vite'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()]
    config.resolve ??= {}
    config.resolve.alias = [
      ...(Array.isArray(config.resolve.alias) ? config.resolve.alias : []),
      { find: '@', replacement: resolve(__dirname, '../src') },
      { find: /^next\/image$/, replacement: resolve(__dirname, '../src/next-shims/image.tsx') },
      { find: /^next\/link$/, replacement: resolve(__dirname, '../src/next-shims/link.tsx') },
      {
        find: /^next\/navigation$/,
        replacement: resolve(__dirname, '../src/next-shims/navigation.ts'),
      },
      {
        find: /^next\/font\/google$/,
        replacement: resolve(__dirname, '../src/next-shims/font-google.ts'),
      },
      {
        find: /^next\/font\/local$/,
        replacement: resolve(__dirname, '../src/next-shims/font-local.ts'),
      },
      { find: /^next\/headers$/, replacement: resolve(__dirname, '../src/next-shims/headers.ts') },
      { find: /^next\/script$/, replacement: resolve(__dirname, '../src/next-shims/script.tsx') },
      {
        find: /^@pascal-app\/core$/,
        replacement: resolve(__dirname, '../src/core/index.ts'),
      },
      {
        find: /^@pascal-app\/core\/(.*)$/,
        replacement: resolve(__dirname, '../src/core/$1'),
      },
      {
        find: /^@pascal-app\/viewer$/,
        replacement: resolve(__dirname, '../src/viewer/index.ts'),
      },
      {
        find: /^@pascal-app\/viewer\/(.*)$/,
        replacement: resolve(__dirname, '../src/viewer/$1'),
      },
      {
        find: /^@pascal-app\/editor$/,
        replacement: resolve(__dirname, '../src/editor/index.tsx'),
      },
      {
        find: /^@pascal-app\/editor\/(.*)$/,
        replacement: resolve(__dirname, '../src/editor/$1'),
      },
    ]
    return config
  },
}

export default config
