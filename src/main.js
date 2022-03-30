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

import '@/permission'

Vue.use(Buefy)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
