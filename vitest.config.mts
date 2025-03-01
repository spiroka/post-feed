import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
  test: {
    workspace: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            name: 'chromium',
            provider: 'playwright'
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
      {
        extends: true,
        plugins: [
          tsconfigPaths(), react()
        ],
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          include: ['**/__tests__/**/*.test.{ts,tsx}'],
          setupFiles: ['./src/vitest.setup.ts']
        }
      }
    ]
  }
});
