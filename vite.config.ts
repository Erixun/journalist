import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import electron from 'vite-plugin-electron/simple'
import path from 'node:path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src/', import.meta.url)),
      },
      { find: '@app', replacement: path.resolve(__dirname, './src/app/index') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components/index'),
      },
      {
        find: '@store',
        replacement: path.resolve(__dirname, './src/store/index'),
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, './src/utils/index'),
      },
    ],
  },
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
        vite: {
          build: {
            rollupOptions: {
              // Make sure to externalize deps that shouldn't be bundled
              // into your library
              external: ['sqlite3'],
            },
          },
        },
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],
})
