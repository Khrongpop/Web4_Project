


import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
import VueFire from 'vuefire'

import Toaster from 'v-toaster'
import { dbAuth } from './firebaseConfig.js'


import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'v-toaster/dist/v-toaster.css'

// import all icons
import 'vue-awesome/icons'
// OR import individual icons
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/star'
// Import the Icon component
import Icon from 'vue-awesome/components/Icon.vue'
// Add the icon component to Vue
Vue.component('icon', Icon)


import './assets/css/auth.css'

// Vue.use(BootstrapVue)
// Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueFire)
// Vue.use(Toaster)
Vue.use(Toaster,{ timeout: 5000 })

const router = new VueRouter ({
    mode: 'history' , // del # url
    routes
})


router.beforeEach( (to,form,next) => {
    let currentUser = dbAuth.currentUser
    let requireAuth = to.matched.some(record => record.meta.requireAuth)
if (requireAuth && !currentUser) {
    next('/')
} else if (!requireAuth && currentUser) {
    next('home')
} else {
    next()
}
})

let app
dbAuth.onAuthStateChanged(function(user){

    if(!app) {
        new Vue({
            el: '#app',
            router ,

            render: h => h(App)
    })
    }

})

