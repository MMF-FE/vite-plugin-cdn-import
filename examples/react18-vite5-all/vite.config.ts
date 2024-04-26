import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cdn from '../../dist'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        cdn({
            enableInDevMode: true,
            modules: [
                'react',
                'react-dom',
                'react-router-dom',
                'dayjs',
                'antd',
                'lodash',
                'moment',
                'axios',
            ],
        }),
    ],
})
