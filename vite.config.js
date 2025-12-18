import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5174,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  css: {
    devSourcemap: false
  }
})
