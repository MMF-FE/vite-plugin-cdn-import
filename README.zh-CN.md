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

### 使用预设

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

### 预设的 npm 包

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


## 参数

### prodUrl
全局 prodUrl 属性，生成 CND 文件路径的模板 url. 
- REF: [prodUrl](https://github.com/shirotech/webpack-cdn-plugin?tab=readme-ov-file#produrlstring--unpkgcomnameversionpath)
- 类型
```ts
{
    prodUrl?: string
}
```
- 默认值: <https://cdn.jsdelivr.net/npm/{name}@{version}/{path}>

### modules
external 模块配置
- 类型
```ts
type GetModuleFunc = (prodUrl: string) => Module
{
    modules: (Module | Module[] | GetModuleFunc | GetModuleFunc[])[]
}
```

### enableInDevMode
是否在开发模式中启用
- 类型: `boolean`
- 默认值：`false`

> vite2, vite3 请确保开发模式 process.env.NODE_ENV === 'development'

### generateScriptTag
自定义生成的 script 标签
- 类型
```ts
generateScriptTag?: (
    name: string,
    scriptUrl: string,
) => Omit<HtmlTagDescriptor, 'tag' | 'children'>
```

### generateCssLinkTag
自定义生成 css link 标签
- 类型
```ts
generateCssLinkTag?: (
    name: string,
    cssUrl: string,
) => Omit<HtmlTagDescriptor, 'tag' | 'children'>
```

### Module 配置

| Name | Description                                   | Type              |
| ---- | --------------------------------------------- | ----------------- |
| name | 需要 CDN 加速的包名称                         | string            |
| alias | 名称的别名，例如“react-dom/client”是“react-dom”的别名   | string[]      |
| var  | 全局分配给模块的变量 | string            |
| path | 指定 CDN 上的加载路径                         | string / string[] |
| css  | 可以指定从 CDN 地址上加载多个样式表           | string / string[] |
| prodUrl  | 覆盖全局的 prodUrl   | string / string[] |

## 其他的 CDN pordUrl 地址

| Name  | pordUrl                                                  |
| ----- | -------------------------------------------------------- |
| unpkg | //unpkg.com/{name}@{version}/{path}                      |
| cdnjs | //cdnjs.cloudflare.com/ajax/libs/{name}/{version}/{path} |

## 资源

- [webpack-cdn-plugin](https://github.com/shirotech/webpack-cdn-plugin)
- [rollup-plugin-external-globals](https://github.com/eight04/rollup-plugin-external-globals)
- [vite-plugin-externals](https://github.com/crcong/vite-plugin-externals)