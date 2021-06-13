# 从 CDN 加载 modules 的 vite 插件

[English](README.md) | 简体中文

[![GitHub tag](https://img.shields.io/github/tag/MMF-FE/vite-plugin-cdn-import.svg)](https://github.com/MMF-FE/vite-plugin-cdn-import/releases)
[![License](https://img.shields.io/github/license/SafdarJamal/vite-template-react)](https://github.com/MMF-FE/vite-plugin-cdn-import/blob/master/LICENSE)

允许指定 modules 在生产环境中使用 CDN 引入。

这可以减少构建时间,并且提高生产环境中页面加载速度。

## 安装

下载 npm 插件

```bash
npm install vite-plugin-cdn-import --save-dev
```

or yarn

```bash
yarn add vite-plugin-cdn-import -D
```

## 基本用法

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

## 参数

| Name    | Description                                            | Type            | Default                                                |
| ------- | ------------------------------------------------------ | --------------- | ------------------------------------------------------ |
| prodUrl | 覆盖全局 prodUrl 属性，允许为特定的模块指定 CDN 的位置 | string          | <https://cdn.jsdelivr.net/npm/{name}@{version}/{path}> |
| modules | 模块配置                                               | Array`<Module>` | -                                                      |

### Module 配置

| Name | Description                                   | Type              |
| ---- | --------------------------------------------- | ----------------- |
| name | 需要 CDN 加速的包名称                         | string            |
| var  | 全局分配给模块的变量，Rollup 需要这个变量名称 | string            |
| path | 指定 CDN 上的加载路径                         | string / string[] |
| css  | 可以指定从 CDN 地址上加载多个样式表           | string / string[] |

## 其他的 CDN pordUrl 地址

| Name  | pordUrl                                                  |
| ----- | -------------------------------------------------------- |
| unpkg | //unpkg.com/{name}@{version}/{path}                      |
| cdnjs | //cdnjs.cloudflare.com/ajax/libs/{name}/{version}/{path} |

## Module 配置参考

### React 相关的

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

### Vue 相关的

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

### 其他

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

## 资源

- [webpack-cdn-plugin](https://github.com/shirotech/webpack-cdn-plugin)
- [rollup-plugin-external-globals](https://github.com/eight04/rollup-plugin-external-globals)
