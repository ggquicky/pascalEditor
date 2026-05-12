import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: /^@pascal-app\/core$/, replacement: resolve(__dirname, 'src/core/index.ts') },
      {
        find: /^@pascal-app\/core\/clone-scene-graph$/,
        replacement: resolve(__dirname, 'src/core/utils/clone-scene-graph.ts'),
      },
      {
        find: /^@pascal-app\/core\/schema$/,
        replacement: resolve(__dirname, 'src/core/schema/index.ts'),
      },
      {
        find: /^@pascal-app\/core\/store$/,
        replacement: resolve(__dirname, 'src/core/store/use-scene.ts'),
      },
      {
        find: /^@pascal-app\/core\/material-library$/,
        replacement: resolve(__dirname, 'src/core/material-library.ts'),
      },
      {
        find: /^@pascal-app\/core\/spatial-grid$/,
        replacement: resolve(__dirname, 'src/core/hooks/spatial-grid/spatial-grid-manager.ts'),
      },
      {
        find: /^@pascal-app\/core\/wall$/,
        replacement: resolve(__dirname, 'src/core/systems/wall/wall-footprint.ts'),
      },
      {
        find: /^@pascal-app\/core\/stair-openings$/,
        replacement: resolve(__dirname, 'src/core/systems/stair/stair-opening-sync.ts'),
      },
      {
        find: /^@pascal-app\/core\/(.*)$/,
        replacement: resolve(__dirname, 'src/core/$1'),
      },
      {
        find: /^@pascal-app\/viewer$/,
        replacement: resolve(__dirname, 'src/viewer/index.ts'),
      },
      {
        find: /^@pascal-app\/viewer\/(.*)$/,
        replacement: resolve(__dirname, 'src/viewer/$1'),
      },
      {
        find: /^@pascal-app\/editor$/,
        replacement: resolve(__dirname, 'src/editor/index.tsx'),
      },
      {
        find: /^@pascal-app\/editor\/(.*)$/,
        replacement: resolve(__dirname, 'src/editor/$1'),
      },
      { find: /^@pascal-app\/mcp$/, replacement: resolve(__dirname, 'src/mcp/index.ts') },
      { find: /^@pascal-app\/mcp\/(.*)$/, replacement: resolve(__dirname, 'src/mcp/$1') },
      { find: /^next\/image$/, replacement: resolve(__dirname, 'src/next-shims/image.tsx') },
      { find: /^next\/link$/, replacement: resolve(__dirname, 'src/next-shims/link.tsx') },
      {
        find: /^next\/navigation$/,
        replacement: resolve(__dirname, 'src/next-shims/navigation.ts'),
      },
      {
        find: /^next\/font\/google$/,
        replacement: resolve(__dirname, 'src/next-shims/font-google.ts'),
      },
      {
        find: /^next\/font\/local$/,
        replacement: resolve(__dirname, 'src/next-shims/font-local.ts'),
      },
      { find: /^next\/headers$/, replacement: resolve(__dirname, 'src/next-shims/headers.ts') },
      { find: /^next\/script$/, replacement: resolve(__dirname, 'src/next-shims/script.tsx') },
    ],
  },
})
