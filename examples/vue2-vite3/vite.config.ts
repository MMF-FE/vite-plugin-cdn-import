import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import importToCDN, { autoComplete } from '../../dist'
console.log('>>>>', process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue2(),
        vue2Jsx(),
        importToCDN({
            enableInDevMode: true,
            modules: [autoComplete(['vue2', 'vue-router@3'])],
        }),
        legacy({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
