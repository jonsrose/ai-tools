import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ai-tools-suite/', // Add this line
  server: {
    port: 3000,
  },
})
