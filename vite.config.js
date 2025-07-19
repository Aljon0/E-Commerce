import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: process.env.PORT || 4173, // required for Render
    host: '0.0.0.0',
    allowedHosts: ['e-commerce-gkjf.onrender.com']             // required for Render
  }
})
