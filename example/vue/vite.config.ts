import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import importToCDN, { autoComplete } from '../../dist/index'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        importToCDN({
            modules: [
                autoComplete('vue'),
                autoComplete('@vueuse/shared'),
                autoComplete('@vueuse/core')
            ],
        }),
    ],
})
