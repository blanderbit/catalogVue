import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import registration from './registration/mainRegistration.vue'
import login from './login/mainLogin.vue'
import products from './product.vue'
import oneProduct from './oneProduct.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    base: "/login",
    routes:[
        {path: '/login',name:'login', component: login},
        {path: '/registration',name:'registration', component: registration},
        {path: '/products',name:'products', component: products},
        {path: '/products/:id',name:'oneProduct', component: oneProduct,props:true},
    ],
})

new Vue({
  el: '#app',
  render: h => h(App),
    router
})
