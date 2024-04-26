import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cdn from '../../dist'
console.log('>>>>', process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        cdn({
            enableInDevMode: true,
            modules: ['vue', 'vue-router'],
        }),
    ],
})
