import { defineConfig } from 'vite'
import dns from 'node:dns'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths';

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), jsconfigPaths()],
})