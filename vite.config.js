import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/sportslocatorapp/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg'],
      manifest: {
        name: 'SportsLocator - Find Free Sports Spots',
        short_name: 'SportsLocator',
        description: 'Discover free public sports venues near you. Table tennis, basketball, boule, and more.',
        theme_color: '#2196F3',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
        categories: ['sports', 'lifestyle'],
        screenshots: [
          {
            src: 'vite.svg',
            sizes: '540x720',
            type: 'image/svg+xml',
            form_factor: 'narrow',
          },
          {
            src: 'vite.svg',
            sizes: '1280x720',
            type: 'image/svg+xml',
            form_factor: 'wide',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
})
