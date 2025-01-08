import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled'],
        },
      },
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': '/src'
    }
  }
})
