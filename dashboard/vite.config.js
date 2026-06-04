import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Determine the API target based on the environment.
// In development we proxy to the local Flask server.
// In production (e.g., Vercel) we default to the deployed Railway backend.
const API_TARGET = process.env.VITE_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://fif-production.up.railway.app'
    : 'http://127.0.0.1:5000');

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
      },
    },
  },
})
