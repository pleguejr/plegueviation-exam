import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Permite que funcione tanto en localhost como en GitHub Pages en cualquier subdirectorio
  resolve: {
    alias: {
      '@plegue/core-engine': path.resolve(__dirname, '../../packages/core-engine/src/index.ts')
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
