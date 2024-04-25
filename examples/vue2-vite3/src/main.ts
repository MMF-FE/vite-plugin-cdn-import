import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import './assets/main.css'

// @ts-ignore
console.log('???', Vue === window.Vue, VueRouter === window.VueRouter)

new Vue({
    render: h => h(App),
}).$mount('#app')
