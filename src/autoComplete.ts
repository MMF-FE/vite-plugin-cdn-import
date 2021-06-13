import { Module } from './type'

/**
 * module 配置自动完成
 */
const modulesConfig = {
	'react': {
		var: 'React',
		jsdeliver: {
			path: 'umd/react.production.min.js'
		}
	},
	'react-dom': {
		var: 'ReactDOM',
		jsdeliver: {
			path: 'umd/react-dom.production.min.js'
		}
	},
	'react-router-dom': {
		var: 'ReactRouterDOM',
		jsdeliver: {
			path: 'umd/react-router-dom.min.js'
		}
	},
	'antd': {
		var: 'antd',
		jsdeliver: {
			path: 'dist/antd.min.js',
			css: 'dist/antd.min.css'
		}
	},
	'ahooks': {
		var: 'ahooks',
		jsdeliver: {
			path: 'dist/ahooks.js'
		}
	},
	'@ant-design/charts': {
		var: 'charts',
		jsdeliver: {
			path: 'dist/charts.min.js'
		}
	},
	'vue': {
		var: 'Vue',
		jsdeliver: {
			path: 'dist/vue.global.prod.js'
		}
	},
	'vue2': {
		var: 'Vue',
		jsdeliver: {
			name: 'vue',
			path: 'dist/vue.runtime.min.js'
		}
	},
	'@vueuse/shared': {
		var: 'VueUse',
		jsdeliver: {
			path: 'index.iife.min.js'
		}
	},
	'@vueuse/core': {
		var: 'VueUse',
		jsdeliver: {
			path: 'index.iife.min.js'
		}
	},
	'moment': {
		var: 'moment',
		jsdeliver: {
			path: 'moment.min.js'
		}
	},
	'eventemitter3': {
		var: 'EventEmitter3',
		jsdeliver: {
			path: 'umd/eventemitter3.min.js'
		}
	},
	'file-saver': {
		var: 'window',
		jsdeliver: {
			path: 'dist/FileSaver.min.js'
		}
	},
	'browser-md5-file': {
		var: 'browserMD5File',
		jsdeliver: {
			path: 'dist/index.umd.min.js'
		}
	},
	'xlsx': {
		var: 'XLSX',
		jsdeliver: {
			path: 'dist/xlsx.full.min.js'
		}
	},
}

export type ModuleName = keyof typeof modulesConfig

function isJsdeliver(prodUrl: string) {
	return prodUrl.includes('//cdn.jsdelivr.net')
}

export default function autoComplete(name: ModuleName) {
	const config = modulesConfig[name]
	if (!config) {
		throw new Error(`The configuration of module ${name} does not exist `)
	}
	return (prodUrl: string) => {
		if (isJsdeliver(prodUrl)) {
			return {
				name,
				var: config.var,
				...config.jsdeliver
			} as Module
		} else {
			throw new Error(`The configuration of module ${name} in ${prodUrl} does not exist `)
		}
	}
}