import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    globalSetup: './tests/global-setup.ts',
    envFiles: ['.env.test'],
    fileParallelism: false,
  },
  resolve: {
    alias: { '@shared': path.resolve(__dirname, '../shared') },
  },
})
