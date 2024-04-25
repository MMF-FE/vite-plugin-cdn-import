import { Module } from './type'

type AutoModuleConfig = Partial<Module> & {
    jsdeliver: Partial<Module>
}

const isDev = process.env.NODE_ENV === 'development'

// console.log('>>>>isDev', isDev, process.env.NODE_ENV)

/**
 * module 配置自动完成
 */
const modulesConfig = {
    react: {
        var: 'React',
        jsdeliver: {
            path: isDev
                ? 'umd/react.development.js'
                : 'umd/react.production.min.js',
        },
    },
    'react-dom': {
        var: 'ReactDOM',
        alias: ['react-dom/client'],
        jsdeliver: {
            path: isDev
                ? 'umd/react-dom.development.js'
                : 'umd/react-dom.production.min.js',
        },
    },
    'react-router-dom': {
        var: 'ReactRouterDOM',
        jsdeliver: {
            path: 'dist/umd/react-router-dom.production.min.js',
        },
    },
    antd: {
        var: 'antd',
        jsdeliver: {
            path: 'dist/antd.min.js',
            css: 'dist/reset.min.css',
        },
    },
    vue: {
        var: 'Vue',
        jsdeliver: {
            path: isDev
                ? 'dist/vue.runtime.global.js'
                : 'dist/vue.runtime.global.prod.js',
        },
    },
    'vue-router': {
        var: 'VueRouter',
        jsdeliver: {
            path: 'dist/vue-router.global.min.js',
        },
    },
    'vue-router@3': {
        var: 'VueRouter',
        jsdeliver: {
            name: 'vue-router',
            path: 'dist/vue-router.min.js',
        },
    },
    vue2: {
        var: 'Vue',
        jsdeliver: {
            name: 'vue',
            path: isDev ? 'dist/vue.runtime.js' : 'dist/vue.runtime.min.js',
        },
    },
    moment: {
        var: 'moment',
        jsdeliver: {
            path: 'moment.min.js',
        },
    },
    dayjs: {
        var: 'dayjs',
        jsdeliver: {
            path: 'dayjs.min.js',
        },
    },
    axios: {
        var: 'axios',
        jsdeliver: {
            path: 'dist/axios.min.js',
        },
    },
    lodash: {
        var: '_',
        jsdeliver: {
            path: 'lodash.min.js',
        },
    },
} satisfies Record<string, AutoModuleConfig>

export type ModuleName = keyof typeof modulesConfig

function isJsdeliver(prodUrl: string) {
    return prodUrl.includes('//cdn.jsdelivr.net')
}

function isUnpkg(prodUrl: string) {
    return prodUrl.includes('//unpkg.com')
}

function isCdnjs(prodUrl: string) {
    return prodUrl.includes('//cdnjs.cloudflare.com')
}

function genModuleByName(name: ModuleName) {
    const config = modulesConfig[name] as AutoModuleConfig
    if (!config) {
        throw new Error(`The configuration of module ${name} does not exist `)
    }
    return (prodUrl: string) => {
        if (isCdnjs(prodUrl)) {
            throw new Error(
                `The configuration of module ${name} in ${prodUrl} does not exist `,
            )
        } else {
            if (!(isJsdeliver(prodUrl) || isUnpkg(prodUrl))) {
                console.warn(
                    'Unknown CDN, please ensure that this CDN supports jsdelivr rules',
                )
            }
            return {
                name,
                var: config.var,
                alias: config.alias,
                ...config.jsdeliver,
            } as Module
        }
    }
}
type GetModuleFunc = (prodUrl: string) => Module

function autoComplete(name: ModuleName): GetModuleFunc
function autoComplete(name: ModuleName[]): GetModuleFunc[]
function autoComplete(
    name: ModuleName | ModuleName[],
): GetModuleFunc | GetModuleFunc[] {
    if (Array.isArray(name)) {
        return name.map(genModuleByName)
    } else {
        return genModuleByName(name)
    }
}

export default autoComplete
