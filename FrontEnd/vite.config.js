import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    hmr: {
      host: '127.0.0.1',
      protocol: 'ws',
      port: 5173,
      clientPort: 5173,
    },
    proxy: {
      '/users': 'http://127.0.0.1:8000',
      '/products': 'http://127.0.0.1:8000',
      '/cart': 'http://127.0.0.1:8000',
      '/admin': 'http://127.0.0.1:8000',
      '/media': 'http://127.0.0.1:8000',
    },
  },
})
