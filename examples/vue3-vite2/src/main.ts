import { createApp } from 'vue'
import * as Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

// @ts-ignore
console.log('???', Vue === window.Vue, VueRouter === window.VueRouter)

createApp(App).mount('#app')
