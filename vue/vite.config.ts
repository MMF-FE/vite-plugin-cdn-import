import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import importToCDN from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
        importToCDN({
          modules: [
              {
                  name: '@vueuse/core',
                  var: 'Vueuse',
                  path: ['https://unpkg.com/@vueuse/shared','https://unpkg.com/@vueuse/core'],
              }
          ],
      }),
      vue()
    ]
})
