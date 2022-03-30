import router from './router'
import store from './store'
import getPageTitle from '@/utils/get-page-title'

import NProgress from 'nprogress' // 页面加载进度条
import 'nprogress/nprogress.css'
import {getToken} from "@/utils/auth"; // progress bar style

NProgress.configure({showSpinner: false}) // NProgress Configuration

// 每次跳转页面：从 “from” 到 “to” ，会执行方法，next 是回调函数
router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    // 获取 to（路由对象）的 meta.title，改变页面标题名
    document.title = getPageTitle(to.meta.title)
    // determine whether the user has logged in
    const hasToken = getToken();

    if (hasToken) {
        if (to.path === '/login') {
            // 登录，跳转首页
            next({path: '/'})
            NProgress.done()
        } else {
            // 获取用户信息
            await store.dispatch('user/getInfo')
            next()
        }
    } else if (!to.meta.requireAuth)
    {
        next()
    }
    else {
        next('/login')
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
