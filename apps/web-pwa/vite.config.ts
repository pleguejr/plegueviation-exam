import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const appVersion = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf-8')
).version;

function injectServiceWorkerVersion() {
  return {
    name: 'inject-sw-version',
    apply: 'build' as const,
    closeBundle() {
      const swDest = path.resolve(__dirname, 'dist/sw.js');
      if (!fs.existsSync(swDest)) return;
      let content = fs.readFileSync(swDest, 'utf-8').replace(
        /const CACHE_NAME = 'plegueviation-cache-v[^']+';/,
        `const CACHE_NAME = 'plegueviation-cache-v${appVersion}';`
      );

      const assetsDir = path.resolve(__dirname, 'dist/assets');
      if (fs.existsSync(assetsDir)) {
        const assetFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js') || f.endsWith('.css'));
        const assetEntries = assetFiles.map(f => `  './assets/${f}',\n  '/assets/${f}',`).join('\n');
        content = content.replace(
          /'\.\/index\.html',/,
          `'./index.html',\n${assetEntries}`
        );
      }

      fs.writeFileSync(swDest, content);
      console.log(`[PWA Build] Injected v${appVersion} and assets into dist/sw.js`);
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), injectServiceWorkerVersion()],
  base: './', // Permite que funcione tanto en localhost como en GitHub Pages en cualquier subdirectorio
  resolve: {
    alias: {
      '@plegue/core-engine': path.resolve(__dirname, '../../packages/core-engine/src/index.ts'),
      '@plegue/shared-sync': path.resolve(__dirname, '../../shared/sync/syncMerge.js')
    }
  },
  define: {
    __APP_VERSION__: JSON.stringify(appVersion)
  },
  server: {
    port: 3000,
    host: true
  }
});
