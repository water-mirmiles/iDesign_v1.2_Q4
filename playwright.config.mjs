import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://127.0.0.1:8898/iDesign/', viewport: { width: 1440, height: 900 } },
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  webServer: { command: 'node scripts/serve.mjs dist', env: { PORT: '8898', BASE_PATH: '/iDesign/' }, url: 'http://127.0.0.1:8898/iDesign/', reuseExistingServer: false }
});
