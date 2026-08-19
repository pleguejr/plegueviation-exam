import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Permite que funcione tanto en localhost como en GitHub Pages en cualquier subdirectorio
  server: {
    port: 3000,
    host: true
  }
});
