import externalGlobals from 'rollup-plugin-external-globals'
import fs from 'fs'
import path from 'path'
import { Plugin } from 'vite'

interface Module {
    name: string
    var: string
    path: string
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

function PluginImportToCDN(options: Options): Plugin[] {
    /**
     * Only work under build
     */
    if (process.env.NODE_ENV !== 'production') {
        return []
    }

    const {
        modules = [],
        prodUrl = 'https://cdn.jsdelivr.net/npm/{name}@{version}/{path}',
    } = options

    const data = modules.map((v) => {
        const version = getModuleVersion(v.name)
        const url = prodUrl
            .replace(/\{name\}/g, v.name)
            .replace(/\{version\}/g, version)
            .replace(/\{path\}/g, v.path)
        return {
            ...v,
            version,
            url,
        }
    })

    const externalMap: {
        [name: string]: string
    } = {}

    data.forEach((v) => {
        externalMap[v.name] = v.var
    })

    return [
        {
            name: 'vite-plugin-cdn-import',
            transformIndexHtml(html) {
                return html.replace(
                    /<\/title>/i,
                    `</title>${data
                        .map((v) => `<script src="${v.url}"></script>`)
                        .join('')}`
                )
            },
        },
        externalGlobals(externalMap),
    ]
}

export {
    PluginImportToCDN as Plugin,
    Options,
}

export default PluginImportToCDN