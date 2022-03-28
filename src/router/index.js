import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () =>import('@/views/Home')
  },
  {
    path: '/register',
    name: 'register',
    component: () =>import('@/views/auth/Register'),
    meta: {title: 'register'}

  },
  {
    path: '/404',
    name: '404',
    component: () =>import('@/views/error/My404'),
    meta: {title: '404-NotFound'}
  },
  // 输入无效地址时重定向到 404 
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
  
]

const router = new VueRouter({
  routes
})

export default router
