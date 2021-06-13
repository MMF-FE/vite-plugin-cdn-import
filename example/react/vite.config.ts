import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import importToCDN, { autoComplete } from '../../dist/index'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        importToCDN({
            modules: [
                autoComplete('react'),
                autoComplete('react-dom'),
                autoComplete('moment'),
                autoComplete('antd')
            ],
        }),
        reactRefresh(),
    ],
})
