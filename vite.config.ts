import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'node:path'

// Vite config — https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isSingleFile = mode === 'singlefile'

  return {
    base: mode === 'production' || isSingleFile ? './' : '/',
    plugins: [
      tailwindcss(),
      react(),
      ...(isSingleFile ? [viteSingleFile()] : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      host: true,
      port: parseInt(process.env.PORT || '5173'),
      allowedHosts: true,
    },
    preview: {
      host: true,
      port: parseInt(process.env.PORT || '4173'),
      allowedHosts: true,
    },
    build: {
      outDir: isSingleFile ? 'dist-singlefile' : 'dist',
      sourcemap: false,
    },
  }
})
