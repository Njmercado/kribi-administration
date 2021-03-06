import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => {
      const token = store.getters.getToken
      if(token.length != 0)
        router.push('/dashboard')
      else
        return import('../views/Login.vue')
    }
  },
  {
    path: '/registrarse',
    name: 'registrarse',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/contraseña',
    name: 'contraseña',
    component: () => import('../views/PasswordRestoration.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => {
      const token = store.getters.getToken
      if(token.length != 0)
        return import('../views/Dashboard.vue')
      else
        router.push("/")
    }
  },
  {
    path: '/records',
    name: 'records',
    component: () => {
     const token = store.getters.getToken
      if(token.length != 0)
        return import('../views/Records.vue')
      else
        router.push("/")
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
