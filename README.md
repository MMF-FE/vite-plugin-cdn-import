## CDN extension for the vite plugin

Allowing you to specify the modules you want to externalize from node_modules in development and a CDN in production.

Basically this will allow you to greatly reduce build time when developing and improve page load performance on production.

### Installation

Install the plugin with npm:

```
npm install vite-plugin-cdn-import --save-dev
```

or yarn

```
yarn add vite-plugin-cdn-import -D
```

### Basic Usage

Add it to vite.config.js

```js
// vite.config.js
import importToCDN from 'vite-plugin-cdn-import'

export default {
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
      ]
    }),
  ],
}
```

### Options

| Name    | Description                                                  | Type          | Default                                              |
| ------- | ------------------------------------------------------------ | ------------- | ---------------------------------------------------- |
| prodUrl | Overrides the global prodUrl, allowing you to specify the CDN location for a specific module | string        | <https://cdn.jsdelivr.net/npm/{name}@{version}/{path>} |
| modules | Modules config                                               | Array`<Module>` | -                                                    |

#### Module

| Name | Description                                                  | Type   |
| ---- | ------------------------------------------------------------ | ------ |
| name | The name of the module you want to externalize               | string |
| var  | A variable that will be assigned to the module in global scope, Rollup requires this | string |
| path | Specify the load path on the CDN                             | string |
| css  | You can alternatively specify multiple style sheets which will be loaded from the CDN                             | string / string[] |

### Other CDN pordUrl

| Name  | pordUrl                                                  |
| ----- | -------------------------------------------------------- |
| unpkg | //unpkg.com/{name}@{version}/{path}                      |
| cdnjs | //cdnjs.cloudflare.com/ajax/libs/{name}/{version}/{path} |

### Ressources

- [webpack-cdn-plugin](https://github.com/shirotech/webpack-cdn-plugin)
- [rollup-plugin-external-globals](https://github.com/eight04/rollup-plugin-external-globals)
