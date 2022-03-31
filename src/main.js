import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局样式设置
import '@/assets/app.css'
// 引入许可验证
import '@/permission'
// 引入时间
import relativeTime from 'dayjs/plugin/relativeTime'

// 国际化时间
import 'dayjs/locale/zh-cn'
const dayjs = require('dayjs')
// 相对时间插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')
dayjs().locale('zh-cn').format()

Vue.prototype.dayjs =dayjs; // 全局可以使用 dayjs

Vue.use(Buefy)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
