import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import importToCDN, { autoComplete } from '../../dist'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        importToCDN({
            enableInDevMode: true,
            modules: [
                autoComplete(['react', 'react-dom', 'react-router-dom']),
                autoComplete(['dayjs', 'antd']),
                autoComplete('lodash'),
                autoComplete(['moment', 'axios']),
            ],
        }),
    ],
})
