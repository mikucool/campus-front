import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义模块，便于管理存储的数据
  modules: {
    user
  }
})

export default store