import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/speech-to-text/', // Add this line
  server: {
    port: 3000,
  },
})
