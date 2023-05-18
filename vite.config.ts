import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      input: {
        wda: path.resolve(__dirname, 'wda.html'),
        portal: path.resolve(__dirname, 'portal.html'),
        background: path.resolve(__dirname, 'src/background.ts'),
      },
      output: {
        entryFileNames: () => '[name].js'
      }
    }
  },
})
