import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/smart-cycle-repair-tool/',
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate', 
    devOptions: {
      enabled: true
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ts,ico,png,svg,woff2}'],
      navigateFallbackDenylist: [/^\/api/],
      runtimeCaching: [
        {
          urlPattern: /^\/api\/.*$/,
          handler: 'NetworkOnly'
        }
      ]
    },
    manifest: {
      name: 'Smart Cycle Repair Tool',
      short_name: 'CycleRepair',
      description: 'Outil de gestion et de devis pour la réparation de cycles',
      theme_color: '#0f172a',  
      background_color: '#f8fafc', 
      display: 'standalone',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
