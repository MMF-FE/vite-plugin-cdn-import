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
import cdn from 'vite-plugin-cdn-import'

export default {
    plugins: [
        cdn({
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

### Use preset

```js
// vite.config.js
import cdn from 'vite-plugin-cdn-import'

export default {
    plugins: [
        cdn({
            modules: ['react', 'react-dom'],
        }),
    ],
}
```

### Preset packages

- react
- react-dom
- react-router-dom
- antd
- vue
- vue2
- vue-router
- vue-router@3
- moment
- dayjs
- axios
- lodash

## Options


### prodUrl
Global prodUrl attribute, template url that generates CND file path.
- REF: [prodUrl](https://github.com/shirotech/webpack-cdn-plugin?tab=readme-ov-file#produrlstring--unpkgcomnameversionpath)
- Type
```ts
{
    prodUrl?: string
}
```
- Default: <https://cdn.jsdelivr.net/npm/{name}@{version}/{path}>

### modules
external config
- Type
```ts
type GetModuleFunc = (prodUrl: string) => Module
{
    modules: (Module | Module[] | GetModuleFunc | GetModuleFunc[])[]
}
```

### enableInDevMode
Enabled in dev mode
- Type: `boolean`
- Default：`false`

> Please ensure process.env.NODE_ENV === 'development' when you use vite2, vite3.

### generateScriptTag
Custom generated script tags
- Type
```ts
generateScriptTag?: (
    name: string,
    scriptUrl: string,
) => Omit<HtmlTagDescriptor, 'tag' | 'children'>
```

### generateCssLinkTag
Customize generated css link tags

- Type
```ts
generateCssLinkTag?: (
    name: string,
    cssUrl: string,
) => Omit<HtmlTagDescriptor, 'tag' | 'children'>
```

### Module

| Name | Description                                   | Type              |
| ---- | --------------------------------------------- | ----------------- |
| name | package name                        | string            |
| alias | Alias ​​of name, for example "react-dom/client" is an alias of "react-dom"   | string[]      |
| var  | Variables assigned globally to the module| string            |
| path | Specify the load path on the CDN                         | string / string[] |
| css  | Multiple style sheets can be loaded from CDN addresses         | string / string[] |
| prodUrl  | Override global prodUrl   | string / string[] |


## Other CDN pordUrl

| Name  | pordUrl                                                  |
| ----- | -------------------------------------------------------- |
| unpkg | //unpkg.com/{name}@{version}/{path}                      |
| cdnjs | //cdnjs.cloudflare.com/ajax/libs/{name}/{version}/{path} |

## Ressources

- [webpack-cdn-plugin](https://github.com/shirotech/webpack-cdn-plugin)
- [rollup-plugin-external-globals](https://github.com/eight04/rollup-plugin-external-globals)
- [vite-plugin-externals](https://github.com/crcong/vite-plugin-externals)
