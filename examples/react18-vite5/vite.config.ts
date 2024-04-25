import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import importToCDN, { autoComplete } from '../../dist'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        importToCDN({
            enableInDevMode: true,
            modules: [autoComplete('react'), autoComplete('react-dom')],
        }),
    ],
})
