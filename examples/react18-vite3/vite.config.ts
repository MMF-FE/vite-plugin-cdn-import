import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cdn from '../../dist'
console.log('>>>>', process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        cdn({
            enableInDevMode: true,
            modules: ['react', 'react-dom'],
        }),
    ],
})
