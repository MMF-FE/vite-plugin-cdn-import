# Import modules from CDN with vite plugin

English | [简体中文](README.zh-CN.md)

[![GitHub tag](https://img.shields.io/github/tag/MMF-FE/vite-plugin-cdn-import.svg)](https://github.com/MMF-FE/vite-plugin-cdn-import/releases)
[![License](https://img.shields.io/github/license/SafdarJamal/vite-template-react)](https://github.com/MMF-FE/vite-plugin-cdn-import/blob/master/LICENSE)

Allows you to specify modules to be introduced in a production environment using a CDN.

This can reduce build time and improve page load speed in production environments.

## Installation

Install the plugin with npm:

```
npm install vite-plugin-cdn-import --save-dev
```

or yarn

```
yarn add vite-plugin-cdn-import -D
```

## Basic Usage

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
                },
            ],
        }),
    ],
}
```

## Options

| Name    | Description                                                                                  | Type            | Default                                                |
| ------- | -------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------ |
| prodUrl | Overrides the global prodUrl, allowing you to specify the CDN location for a specific module | string          | <https://cdn.jsdelivr.net/npm/{name}@{version}/{path}> |
| modules | Modules config                                                                               | Array`<Module>` | -                                                      |

### Module

| Name | Description                                                                           | Type              |
| ---- | ------------------------------------------------------------------------------------- | ----------------- |
| name | The name of the module you want to externalize                                        | string            |
| var  | A variable that will be assigned to the module in global scope, Rollup requires this  | string            |
| path | Specify the load path on the CDN                                                      | string / string[] |
| css  | You can alternatively specify multiple style sheets which will be loaded from the CDN | string / string[] |

## Other CDN pordUrl

| Name  | pordUrl                                                  |
| ----- | -------------------------------------------------------- |
| unpkg | //unpkg.com/{name}@{version}/{path}                      |
| cdnjs | //cdnjs.cloudflare.com/ajax/libs/{name}/{version}/{path} |

## Module Configuration Reference

### React Related

```js
{
    name: 'react',
    var: 'React',
    path: 'umd/react.production.min.js',
},
{
    name: 'react-dom',
    var: 'ReactDOM',
    path: 'umd/react-dom.production.min.js',
},
{
    name: 'react-router-dom',
    var: 'ReactRouterDOM',
    path: 'umd/react-router-dom.min.js'
},
{
    name: 'antd',
    var: 'antd',
    path: 'dist/antd.min.js',
    css: 'dist/antd.min.css'
},
{
    name: 'ahooks',
    var: 'ahooks',
    path: 'dist/ahooks.js'
},
{
    name: '@ant-design/charts',
    var: 'charts',
    path: 'dist/charts.min.js',
},
```

### Vue Related

```js
//Vue3
{
    name: 'vue',
    var: 'Vue',
    path: 'dist/vue.global.prod.js',
},
//Vue2
{
    name: 'vue',
    var: 'Vue',
    path: 'dist/vue.runtime.min.js',
},
//VueUse
{
    name: '@vueuse/shared',
    var: 'VueUse',
    path: 'index.iife.min.js'
},
{
    name: '@vueuse/core',
    var: 'VueUse',
    path: 'index.iife.min.js',
},
```

### Other

```js
{
    name: 'moment',
    var: 'moment',
    path: 'moment.min.js',
},
{
    name: 'eventemitter3',
    var: 'EventEmitter3',
    path: 'umd/eventemitter3.min.js'
},
{
    name: 'file-saver',
    var: 'window',
    path: 'dist/FileSaver.min.js'
},
{
    name: 'browser-md5-file',
    var: 'browserMD5File',
    path: 'dist/index.umd.min.js',
},
{
    name: 'xlsx',
    var: 'XLSX',
    path: 'dist/xlsx.full.min.js',
},
```

## Ressources

- [webpack-cdn-plugin](https://github.com/shirotech/webpack-cdn-plugin)
- [rollup-plugin-external-globals](https://github.com/eight04/rollup-plugin-external-globals)
