import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import importToCDN from '../../dist/index'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        importToCDN({
            // prodUrl: "//unpkg.com/{name}@{version}/{path}",
            modules: [
                {
                    name: 'vue',
                    var: 'Vue',
                    path: `dist/vue.global.prod.js`,
                },
                // {
                //     name: '@vueuse/shared',
                //     var: 'VueUse',
                //     path: 'index.iife.min.js'
                // },
                {
                    name: '@vueuse/core',
                    var: 'VueUse',
                    // path: 'index.iife.min.js',
                    path: [
                        '//unpkg.com/@vueuse/shared',
                        '//unpkg.com/@vueuse/core',
                    ],
                },
            ],
        }),
    ],
})
