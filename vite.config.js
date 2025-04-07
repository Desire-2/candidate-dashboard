import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split vendor libraries into a separate chunk
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the chunk size warning limit (optional)
  },
})