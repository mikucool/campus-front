import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //主页
  {
    path: '/',
    name: 'home',
    component: () =>import('@/views/Home')
  },
  // 注册
  {
    path: '/register',
    name: 'register',
    component: () =>import('@/views/auth/Register'),
    meta: {title: 'register'}

  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () =>import('@/views/auth/Login'),
    meta: {title: 'login'}

  },
  // 发帖
  {
    path: '/post/create',
    name: 'post-create',
    component: () =>import('@/views/post/Create'),
    meta: {title: '发布', requireAuth: true}

  },
  // 404
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

// 重写 push 方法，捕捉异常
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes
})

export default router
