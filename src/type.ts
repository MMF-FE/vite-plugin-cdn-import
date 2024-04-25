export interface Module {
    name: string
    var: string
    path: string | string[]
    alias?: string[]
    css?: string | string[]
}

export interface Options {
    prodUrl?: string
    modules: (Module | ((prodUrl: string) => Module))[]
    /** Enabled in dev mode, default is false */
    enableInDevMode?: boolean
}
