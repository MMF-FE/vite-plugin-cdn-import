import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import importToCDN, { autoComplete } from '../../dist'

console.log('>>>>', process.env.NODE_ENV)
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        importToCDN({
            enableInDevMode: true,
            modules: [autoComplete('react'), autoComplete('react-dom')],
            generateScriptTag(name, scriptUrl) {
                return {
                    attrs: {
                        tid: '0',
                    },
                    injectTo: 'body-prepend',
                }
            },
        }),
    ],
})
