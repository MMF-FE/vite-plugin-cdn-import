import externalGlobals from 'rollup-plugin-external-globals'
import fs from 'fs'
import path from 'path'
import { Plugin, UserConfig } from 'vite'
import { Module, Options } from './type'
import autoComplete from './autoComplete'

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

    return ''
}

/**
 * 是否完整的 url
 * @param path
 * @returns
 */
function isFullPath(path: string) {
    return path.startsWith('http:') ||
        path.startsWith('https:') ||
        path.startsWith('//')
        ? true
        : false
}

function renderUrl(
    url: string,
    data: {
        name: string
        version: string
        path: string
    },
) {
    const { path } = data
    if (isFullPath(path)) {
        url = path
    }
    return url
        .replace(/\{name\}/g, data.name)
        .replace(/\{version\}/g, data.version)
        .replace(/\{path\}/g, path)
}

function PluginImportToCDN(options: Options): Plugin[] {
    const {
        modules = [],
        prodUrl = 'https://cdn.jsdelivr.net/npm/{name}@{version}/{path}',
    } = options

    let isBuild = false

    const data = modules.map(m => {
        let v: Module
        if (typeof m === 'function') {
            v = m(prodUrl)
        } else {
            v = m
        }
        const version = getModuleVersion(v.name)
        let pathList: string[] = []
        if (!Array.isArray(v.path)) {
            pathList.push(v.path)
        } else {
            pathList = v.path
        }

        const data = {
            ...v,
            version,
        }

        pathList = pathList.map(p => {
            if (!version && !isFullPath(p)) {
                throw new Error(
                    `modules: ${data.name} package.json file does not exist`,
                )
            }
            return renderUrl(prodUrl, {
                ...data,
                path: p,
            })
        })

        let css = v.css || []
        if (!Array.isArray(css) && css) {
            css = [css]
        }

        const cssList = !Array.isArray(css)
            ? []
            : css.map(c =>
                  renderUrl(prodUrl, {
                      ...data,
                      path: c,
                  }),
              )

        return {
            ...v,
            version,
            pathList,
            cssList,
        }
    })

    const externalMap: {
        [name: string]: string
    } = {}

    data.forEach(v => {
        externalMap[v.name] = v.var
        if (Array.isArray(v.alias)) {
            v.alias.forEach(alias => {
                externalMap[alias] = v.var
            })
        }
    })

    const plugins: Plugin[] = [
        {
            name: 'vite-plugin-cdn-import',
            config(_, { command }) {
                const userConfig: UserConfig = {
                    build: {
                        rollupOptions: {},
                    },
                }

                if (command === 'build') {
                    isBuild = true

                    userConfig!.build!.rollupOptions = {
                        plugins: [externalGlobals(externalMap)],
                    }
                } else {
                    isBuild = false
                }

                return userConfig
            },
            transformIndexHtml(html) {
                const cssCode = data
                    .map(v =>
                        v.cssList
                            .map(css => `<link href="${css}" rel="stylesheet">`)
                            .join('\n'),
                    )
                    .filter(v => v)
                    .join('\n')

                const jsCode = !isBuild
                    ? ''
                    : data
                          .map(p =>
                              p.pathList
                                  .map(url => `<script src="${url}"></script>`)
                                  .join('\n'),
                          )
                          .join('\n')

                return html.replace(
                    /<\/title>/i,
                    `</title>${cssCode}\n${jsCode}`,
                )
            },
        },
    ]

    return plugins
}

export { PluginImportToCDN as Plugin, Options, autoComplete }

export default PluginImportToCDN
