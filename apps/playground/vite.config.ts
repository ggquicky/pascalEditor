import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'node:path';

export default defineConfig({
  root: __dirname,
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths({
      root: '../../', // Look for tsconfigs from the monorepo root
      ignoreConfigErrors: true,
    }),
  ],
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  },
  resolve: {
    alias: {
      '@pascal/editor': resolve(__dirname, '../../src'),
      'next/image': resolve(__dirname, '../../src/components/shim/image.tsx'),
    },
  },
});
