
export interface Module {
    name: string
    var: string
    path: string | string[]
    css?: string | string[]
    es6?: boolean
}

export interface Options {
    modules: (Module | ((prodUrl: string) => Module))[]
    prodUrl?: string
}
