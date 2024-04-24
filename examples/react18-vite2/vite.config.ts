import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import importToCDN, { autoComplete } from '../../dist/index'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        importToCDN({
            modules: [autoComplete('react'), autoComplete('react-dom')],
        }),
    ],
})
