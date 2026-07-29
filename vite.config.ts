import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User page (neg2sode.github.io) is served from the domain root, so base is '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { port: 5173 },
});
