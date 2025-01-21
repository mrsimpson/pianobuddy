import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core vendor dependencies
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vendor-core'
            }
            // Database related dependencies
            if (id.includes('dexie')) {
              return 'vendor-db'
            }
            // Other vendor dependencies
            return 'vendor-others'
          }

          // Route components
          if (id.includes('src/views/SongLibrary.vue')) return 'route-library'
          if (id.includes('src/views/CollectionsView.vue')) return 'route-collections'
          if (id.includes('src/views/ColorConfig.vue')) return 'route-config'

          // Visualizer and its major components
          if (id.includes('src/views/SongVisualizer.vue')) return 'route-visualizer-core'
          if (id.includes('src/components/sheet/MusicSheetDisplay.vue')) return 'visualizer-sheet'
          if (id.includes('src/components/playalong/ColoredPlayalong.vue')) return 'visualizer-playalong'

          // Shared components and utilities
          if (id.includes('src/components/layout')) return 'shared-layout'
          if (id.includes('src/composables')) return 'shared-composables'
          if (id.includes('src/services')) return 'shared-services'
        }
      }
    },
    chunkSizeWarningLimit: 600,
  }
})
