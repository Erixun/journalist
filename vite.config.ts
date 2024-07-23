import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/journalist/',
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'Journalist',
      short_name: 'Journalist',
      theme_color: '#000000',
      icons: [
        {
          src: '/J-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/J-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/J-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
  })],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@components': '/src/components',
      '@db': '/src/db',
      '@store': '/src/store',
      '@utils': '/src/utils',
    },
  },
})
