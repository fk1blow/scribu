import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [reactRefresh(), mkcert()],
  server: {
    https: true,
  },
})
