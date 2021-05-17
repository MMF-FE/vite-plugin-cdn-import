import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import importToCDN from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    importToCDN({
      modules: [
        {
            name: 'react',
            var: 'React',
            path: `umd/react.production.min.js`,
        },
        {
            name: 'react-dom',
            var: 'ReactDOM',
            path: `umd/react-dom.production.min.js`,
        }
    ]}),
    reactRefresh()
  ]
})
