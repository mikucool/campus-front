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

    // 帖子详情
  {
    path: '/post/:id', // 动态路由，id 可变
    name: 'post-detail',
    component: () =>import('@/views/post/Detail'),

  },
  // 编辑
  {
    path: '/post/edit/:id',
    name: 'topic-edit',
    component: () =>import('@/views/post/Edit'),
    meta: {title: '编辑'}

  },
  // 标签下的帖子
  {
    path: '/tag/:name',
    name: 'tag',
    component: () =>import('@/views/tag/Tag'),
    meta: {title: '主题列表'}

  },
  // 检索
  {
    path: '/search',
    name: 'search',
    component: () =>import('@/views/Search'),
    meta: {title: '检索'}

  },
  // 用户主页
  {
    path: '/member/:username/home',
    name: 'userHome',
    component: () =>import('@/views/user/Profile'),
    meta: {title: '用户主页'}

  },
  // 用户设置
  {
    path: '/member/:username/setting',
    name: 'userSetting',
    component: () =>import('@/views/user/Setting'),
    meta: {title: '设置'}

  },
  // 聊天
  {
    path: '/chat/:username',
    name: 'chat',
    component: () =>import('@/views/chat/ChatT2'),
    meta: {title: 'Chat'}

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
  },
  //测试websocket
  {
    path: '/test-websocket',
    name: 'test-websocket',
    component: () =>import('@/views/test/Im')
  },
  //测试上传文件
  {
    path: '/test-upload',
    name: 'test-upload',
    component: () =>import('@/views/test/Upload')
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
