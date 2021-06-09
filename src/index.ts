import externalGlobals from 'rollup-plugin-external-globals'
import fs from 'fs'
import path from 'path'
import { Plugin } from 'vite'

interface Module {
    name: string
    var: string
    path: string | string[]
    css?: string | string[]
}

interface Options {
    modules: Module[]
    prodUrl?: string
}

/**
 * get npm module version
 * @param name
 * @returns
 */
function getModuleVersion(name: string): string {
    const pwd = process.cwd()
    const pkgFile = path.join(pwd, 'node_modules', name, 'package.json')
    if (fs.existsSync(pkgFile)) {
        const pkgJson = JSON.parse(fs.readFileSync(pkgFile, 'utf8'))
        return pkgJson.version
    }
    throw new Error(`modules: ${name} package.json file does not exist`)
}

function renderUrl(url: string, data: {
    name: string
    version: string
    path: string | string[]
}) {
    let path = ''
    if (Array.isArray(path)) {
        path = data.path[0]
    }else {
        path = data.path as string
    }

    return url.replace(/\{name\}/g, data.name)
        .replace(/\{version\}/g, data.version)
        .replace(/\{path\}/g, path)
}

function PluginImportToCDN(options: Options): Plugin[] {

    const {
        modules = [],
        prodUrl = 'https://cdn.jsdelivr.net/npm/{name}@{version}/{path}',
    } = options

    const isDev = process.env.NODE_ENV !== 'production'

    const data = modules.map((v) => {
        const version = getModuleVersion(v.name)
        const data = {
            ...v,
            version
        }
        const url = renderUrl(prodUrl, data)
        let css = v.css || []

        if (!Array.isArray(css) && css) {
            css = [css]
        }


        return {
            ...v,
            version,
            urlList: !Array.isArray(url) ? [] : url.map((u) => renderUrl(prodUrl, {
                ...data,
                path: u
            })),
            cssList: !Array.isArray(css) ? [] : css.map(c => renderUrl(prodUrl, {
                ...data,
                path: c
            }))
        }
    })

    const externalMap: {
        [name: string]: string
    } = {}

    data.forEach((v) => {
        externalMap[v.name] = v.var
    })

    const plugins: Plugin[] = [
        {
            name: 'vite-plugin-cdn-import',
            transformIndexHtml(html) {
                const cssCode = data
                    .map(v => v.cssList.map(css => `<link href="${css}" rel="stylesheet">`).join('\n'))
                    .filter(v => v)
                    .join('\n')

                const jsCode = isDev
                    ? ''
                    : data
                        .map((v) => v.urlList.map(url => `<script src="${url}"></script>`).join('\n'))
                        .filter(v => v)
                        .join('\n')

                return html.replace(
                    /<\/title>/i,
                    `</title>${cssCode}\n${jsCode}`
                )
            },
        },
    ]

    if (!isDev) {
        console.log(externalMap,'externalMap')
        plugins.push(externalGlobals(externalMap),)
    }

    return plugins
}

export {
    PluginImportToCDN as Plugin,
    Options,
}

export default PluginImportToCDN