import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  build: {
    outDir: 'dist',
    copyPublicDir: true,
    sourcemap: true
  },
  server: {
    port: 5173,
    historyApiFallback: true
  },
}); 