import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["./node_modules/.vite/deps/chunk-3ihv7ro6.js?v=c0b7fd9d"],
  },
});
